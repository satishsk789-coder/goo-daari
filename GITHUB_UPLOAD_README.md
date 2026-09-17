# GOO DAARI GitHub-upload-friendly build

This build removes the 128 individual physical HTML files that caused GitHub Web upload to exceed its 100-file limit.

Individual business URLs are preserved, for example:
`/businesses/peddapuram/example-business.html`

Vercel rewrites those URLs to `business.html`, which reads the matching record from `data.js` and generates the business title, description, canonical URL and LocalBusiness JSON-LD dynamically.

## Upload
Upload the contents of this folder to the existing `satishk789-coder/goo-daari` repository. This folder contains fewer than 100 files.

Do not upload the old `businesses` folder.
