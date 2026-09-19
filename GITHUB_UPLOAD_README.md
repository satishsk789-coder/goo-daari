# GOO DAARI — GitHub Web Upload Friendly

This version is intentionally kept below GitHub's browser upload file-count limit.

It keeps the local city/service/guide SEO pages, the new classy homepage, the on-demand service flow, directory search, GA4/GTM assets and generated service photography.

The 128 separate business HTML files are replaced by one `business.html` plus a Vercel rewrite. Clean business URLs such as `/businesses/peddapuram/example.html` continue to resolve on Vercel using the database in `data.js`.

### Important SEO trade-off
The city/service/guide SEO pages remain static. Individual business detail pages are rendered from `data.js` at request time through the rewrite, rather than existing as 128 separate static HTML files. If maximum individual-business crawlability becomes important later, use the full SEO build with GitHub Desktop or a CI build step.

### Upload
Upload the contents of this folder to `satishk789-coder/goo-daari` and commit to `main`. Vercel will deploy automatically.
