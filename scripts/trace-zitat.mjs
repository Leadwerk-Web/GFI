import fs from "fs";
import zlib from "zlib";

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
}

function decodePNG(buf) {
  let pos = 8;
  const chunks = {};
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    pos += 4;
    const type = buf.slice(pos, pos + 4).toString();
    pos += 4;
    const data = buf.slice(pos, pos + len);
    pos += len + 4;
    chunks[type] = chunks[type] ? Buffer.concat([chunks[type], data]) : data;
  }

  const w = chunks.IHDR.readUInt32BE(0);
  const h = chunks.IHDR.readUInt32BE(4);
  const depth = chunks.IHDR[8];
  const color = chunks.IHDR[9];
  const bpp = color === 6 ? 4 : color === 2 ? 3 : color === 4 ? 2 : 1;
  const raw = zlib.inflateSync(chunks.IDAT);
  const stride = Math.ceil((w * bpp * depth) / 8) + 1;
  const out = Buffer.alloc(w * h * bpp);
  let rpos = 0;
  let opos = 0;

  for (let y = 0; y < h; y++) {
    const filter = raw[rpos++];
    const row = raw.slice(rpos, rpos + stride - 1);
    rpos += stride - 1;
    const prev = Buffer.alloc(row.length);

    for (let x = 0; x < row.length; x++) {
      let v = row[x];
      if (filter === 1) v = (v + (prev[x] || 0)) & 255;
      else if (filter === 2) v = (v + (y > 0 ? out[opos + x - bpp * w] : 0)) & 255;
      else if (filter === 3) {
        v = (v + Math.floor(((prev[x] || 0) + (y > 0 ? out[opos + x - bpp * w] : 0)) / 2)) & 255;
      } else if (filter === 4) {
        v = (v + paeth(prev[x] || 0, y > 0 ? out[opos + x - bpp * w] : 0, y > 0 ? out[opos + x - bpp * w - bpp] : 0)) & 255;
      }
      prev[x] = v;
      out[opos++] = v;
    }
  }

  return { w, h, bpp, out };
}

function traceToSvg(mask, w, h) {
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!mask[y * w + x]) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  const pad = 2;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);

  const bw = maxX - minX + 1;
  const bh = maxY - minY + 1;
  const paths = [];

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (!mask[y * w + x]) continue;
      const rx = x - minX;
      const ry = y - minY;
      paths.push(`M${rx} ${ry}h1v1h-1z`);
    }
  }

  return {
    svg: [
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${bw} ${bh}" fill="currentColor" aria-hidden="true">`,
      `<path d="${paths.join("")}"/>`,
      `</svg>`,
    ].join("\n"),
    bbox: { minX, minY, maxX, maxY, bw, bh },
  };
}

function simplifyPaths(mask, w, h) {
  const visited = new Uint8Array(w * h);
  const rects = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (!mask[idx] || visited[idx]) continue;

      let width = 1;
      while (x + width < w && mask[y * w + x + width] && !visited[y * w + x + width]) width++;

      let height = 1;
      outer: while (y + height < h) {
        for (let dx = 0; dx < width; dx++) {
          const i = (y + height) * w + x + dx;
          if (!mask[i] || visited[i]) break outer;
        }
        height++;
      }

      for (let dy = 0; dy < height; dy++) {
        for (let dx = 0; dx < width; dx++) {
          visited[(y + dy) * w + x + dx] = 1;
        }
      }

      rects.push({ x, y, width, height });
    }
  }

  return rects;
}

function rectsToSvg(rects, bbox) {
  const { minX, minY, bw, bh } = bbox;
  const d = rects
    .map(({ x, y, width, height }) => {
      const rx = x - minX;
      const ry = y - minY;
      return `M${rx} ${ry}h${width}v${height}h-${width}z`;
    })
    .join("");

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${bw} ${bh}" fill="#f29b5b" aria-hidden="true">`,
    `<path fill-rule="evenodd" d="${d}"/>`,
    `</svg>`,
  ].join("\n");
}

const buf = fs.readFileSync("assets/img/zitat.png");
const { w, h, bpp, out } = decodePNG(buf);
const mask = new Uint8Array(w * h);

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = (y * w + x) * bpp;
    const r = out[i];
    const g = out[i + 1] ?? r;
    const b = out[i + 2] ?? r;
    const a = bpp === 4 ? out[i + 3] : 255;
    mask[y * w + x] = a > 180 && r + g + b < 500 ? 1 : 0;
  }
}

let minX = w;
let minY = h;
let maxX = 0;
let maxY = 0;
let count = 0;

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (!mask[y * w + x]) continue;
    count++;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}

const pad = 4;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(w - 1, maxX + pad);
maxY = Math.min(h - 1, maxY + pad);
const bbox = { minX, minY, maxX, maxY, bw: maxX - minX + 1, bh: maxY - minY + 1 };

console.log("pixels", count, "bbox", bbox);

const rects = simplifyPaths(mask, w, h).filter(
  (r) => r.x >= minX && r.y >= minY && r.x + r.width <= maxX + 1 && r.y + r.height <= maxY + 1,
);

const svg = rectsToSvg(rects, bbox);
fs.writeFileSync("assets/img/zitat.svg", svg);
console.log("Wrote assets/img/zitat.svg", rects.length, "rects");
