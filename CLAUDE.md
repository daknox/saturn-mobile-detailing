# Saturn Mobile Detailing site

Static HTML/CSS/JS, no build step. See README.md.

Brand: Saturn Mobile Detailing. Before any UI work, read brand/BRAND.md.
Use brand/tokens/tokens.css variables (no raw hex), logos from brand/logos/<theme>/, never redraw or recolor the logo.

- Dark theme is the default. Pages set `<html data-theme="dark">` and use the `brand/logos/dark/` set.
- Asset paths are relative (`brand/...`, not `/brand/...`) so the site works under a GitHub Pages project subpath.
- Red (`--accent`) text on charcoal is below 4.5:1 contrast. Use it for large text, icons, rules and buttons, not small body text.
- Header, footer and mobile CTA bar are duplicated in every page. Keep them in sync.
