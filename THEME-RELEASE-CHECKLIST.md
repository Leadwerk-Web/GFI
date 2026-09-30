# Theme release checklist

Use this checklist together with the root `AGENTS.md`. Every employee or agent
must read both files before creating, importing or publishing a theme. A green
GTD build alone is not permission to publish.

## Source before push

- [ ] `AGENTS.md`, this checklist and `PROJECT-BRIEF.md` exist in the repository root.
- [ ] All customer facts and legal-review fields are real; no `REVIEW REQUIRED` remains in publishable content.
- [ ] Every public HTML file has one `<main>`, one `<h1>`, title, description, focus keyphrase and editable annotations.
- [ ] Released `sourceKey`, field keys and repeater item keys were not renamed.
- [ ] Internal links use project paths or typed page references; no empty `href`, production host or stale `.html` runtime navigation remains.
- [ ] JPG/JPEG/PNG sources were converted to lowercase WebP quality 85 and every HTML/CSS/JS/JSON reference was updated.
- [ ] No image, SVG, video, PDF or other media basename equals the final slug of a WordPress page.
- [ ] Logo, favicon, default/page OG images, alt text, 404, Danke, Impressum and Datenschutz are complete.
- [ ] Static form and `project.variables.json` use identical labels/choices and one stable `sourceFormId`.
- [ ] Project CSS styles static controls and WPForms text, email, textarea, select, checkbox/radio, labels and submit button without numeric form IDs.

## GTD build gate

- [ ] Repository is clean and the intended commit is pushed.
- [ ] GTD `validate` passes without weakening a validator.
- [ ] GTD signed-theme `build --dry-run` passes and reports all intended pages/media.
- [ ] Theme Market shows the intended project, channel and new immutable version.

## WordPress staging gate

- [ ] Use the WordPress/PHP versions required by the generated profile and activate WPForms Lite 1.10.2+ before form import.
- [ ] Install the signed candidate and run its content import to completion with zero errors.
- [ ] Every registered route has the expected status and unsuffixed permalink; no attachment has stolen a page slug.
- [ ] Static and WordPress title, H1, visible content, image count, image alt and media responses match on every page.
- [ ] Desktop and mobile screenshots match at representative viewports; header, footer, modals, 404 and Danke remain usable.
- [ ] WPForms visually matches the static form, validates required fields, sends to the configured recipient, sets Reply-To to the visitor email and redirects to Danke.
- [ ] Header/footer page references resolve to current permalinks and contain no old suffixed route such as `-2` or `-4`.
- [ ] Unknown URL returns HTTP 404 and noindex; Danke is noindex.
- [ ] A second import is idempotent and preserves an editor-changed field/media value.

Only publish after every applicable item is checked. If staging differs from the
static source, fix the canonical source, GTD profile or shared importer and build
a new version; do not repair only the production database.
