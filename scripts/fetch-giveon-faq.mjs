const res = await fetch("https://demo.awaikenthemes.com/giveon/home-version-3/");
const html = await res.text();
const idx = html.indexOf("elementor-element-a329e6d");
console.log(html.slice(idx, idx + 500));
const cssMatch = [...html.matchAll(/<link[^>]+href="([^"]+)"[^>]*>/gi)].map(m=>m[1]).filter(u=>u.includes('.css'));
console.log('\nCSS files:', cssMatch.slice(0,8));
