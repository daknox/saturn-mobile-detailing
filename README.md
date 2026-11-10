# Saturn Mobile Detailing

Static marketing website for Saturn Mobile Detailing, a mobile auto detailing business. Plain HTML, CSS and JS with no build step.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero with 3-step quote form, why us + stats, benefits, process, packages, gallery preview, reviews, FAQ, CTA |
| `services.html` | Packages and pricing, add-ons, FAQ |
| `gallery.html` | Before and after photo grid with lightbox |
| `contact.html` | Booking form and contact info |

## Preview locally

Open `index.html` in a browser, or run a local server:

```bash
python -m http.server 8000
# or
npx serve .
```

## Editing content

- **Placeholders:** search the project for `[` and `TODO` to find everything that needs real business info (phone, email, city, prices, reviews).
- **Header and footer** are copied into all four HTML files. When you change one, update it in each page.
- **Brand:** logos, favicons and color tokens live in `brand/` (see `brand/BRAND.md`). The site uses the dark theme and the `brand/logos/dark/` logo set. Never redraw or recolor the logo.
- **Colors and fonts:** come from `brand/tokens/tokens.css`. Style with the semantic variables (`--bg`, `--fg`, `--accent`, `--surface`, `--border`, `--fg-muted`), not raw hex. Site-only values (container width, header height) are in `:root` at the top of `css/styles.css`.
- **Photos:** see `assets/images/README.md`.

## Booking form setup (Formspree)

1. Create a free account at https://formspree.io and make a new form.
2. Copy the form ID (the part after `/f/`).
3. Replace `YOUR_ID` in the form `action` URL in `contact.html` (booking form) and `index.html` (hero quote form).

Submissions are emailed to the account owner. Links like `contact.html?package=full` preselect the package.

## Deploying

A GitHub Actions workflow (`.github/workflows/pages.yml`) deploys to GitHub Pages on every push to `main`.

1. Repo **Settings → Pages → Source: GitHub Actions**
2. Push to `main`

> GitHub Pages on a **private** repo requires a paid GitHub plan. On a free account, either make the repo public or connect it to Netlify or Cloudflare Pages instead. Both host private repos for free, with no build command and the publish directory set to `/`.

### Custom domain

Add a `CNAME` file containing the domain (e.g. `saturnmobiledetailing.com`), then point DNS at GitHub Pages or whichever host you use.
