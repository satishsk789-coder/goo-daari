# GOO DAARI Projects & Rentals — Batch 1

## Files
- `projects-rentals/` — standalone hub and six service enquiry pages.
- `assets/projects-rentals/` — CSS and JavaScript used only by this new vertical.
- `projects-rentals-sitemap-additions.xml` — URLs to append to the existing sitemap after review.

## Deployment
Copy the `projects-rentals` folder into the website root.
Copy `assets/projects-rentals` into the existing root `assets` folder.
Do not replace existing files. These are new paths only.

Then append the seven `<url>` entries from `projects-rentals-sitemap-additions.xml` into the existing root `sitemap.xml` (inside its existing `<urlset>` element). Do not replace the whole sitemap.

The enquiry form posts to the existing Web3Forms access key found in the uploaded project. It has no file uploads and does not change existing forms. Test one submission before public promotion. If you rotate the existing key, update `assets/projects-rentals/projects-rentals.js`.

## Important
- No existing website files are modified in this package.
- No provider inventory or pricing is claimed as confirmed.
- The form captures basic enquiry details only; do not request identity documents or bank details.
- Service pages explicitly state that availability and quotations require confirmation.
- Validate all providers, insurance, machinery, licences, delivery, safety and contract terms before accepting a booking.
- Add city-specific pages only when genuine local provider coverage and unique local information are available.
