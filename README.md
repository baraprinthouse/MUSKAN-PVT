# Muskan Electric website (static)

Plain HTML, CSS and JavaScript. No build step, no server. Open `index.html` to preview.

## Before going live
1. Replace `YOUR-DOMAIN.com` everywhere (index.html, robots.txt, sitemap.xml):
   `grep -rl YOUR-DOMAIN.com . | xargs sed -i 's/YOUR-DOMAIN.com/yourdomain.com/g'`
2. Add images to `images/` (png): `hero.png`, `og.png` (1200x630), `<id>.png` per product (e.g. `me-sathi.png`), optional `<id>-<colour>.png` (e.g. `me-sathi-red.png`). Missing images show a neutral placeholder.
3. Edit products, prices, specs, colours and the YouTube `video` link in `js/products.js`. Only youtube.com / youtu.be links are accepted. Verify every spec, price and warranty with the owner.
4. Phone / WhatsApp number is in `js/app.js` (`WA`) and `index.html`.

## Publish with GitHub Pages
```
git init && git add . && git commit -m "Muskan Electric website"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```
Repo Settings > Pages > Deploy from branch > `main` / root. Add the custom domain there and tick Enforce HTTPS.

## SEO checklist (owner steps)
Search Console: add the site, submit `sitemap.xml`, request indexing for the home page. Bing Webmaster Tools: import from Search Console. Create and verify the Google Business Profile with the same name, address and phone as the site. Add Google Analytics 4 (paste its snippet before `</head>`). Run PageSpeed Insights after adding real images.

## Not included (needs a backend)
Admin login, staff roles and lead assignment, stock and inventory, live Google reviews, Nepali language switch, 360-degree view. Enquiries open WhatsApp instead of saving to a database.
