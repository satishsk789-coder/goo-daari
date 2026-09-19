# GOO DAARI — Website Upload Guide

This version is designed for GitHub's browser uploader and does not require the 128 individual business HTML files.

## Upload
1. Extract this ZIP.
2. Upload all contents to the existing `satishk789-coder/goo-daari` repository.
3. Commit to `main`.
4. Vercel will deploy automatically.

## Business URLs
Business pages use clean URLs such as:
`/businesses/peddapuram/example-business.html`

Vercel rewrites these URLs to the single dynamic `business.html` page using `vercel.json` and the database in `data.js`.

## Homepage direction
- GOO DAARI On-Demand Services is the primary action.
- Local business listings remain inside Explore Local and SEO pages.
- No individual provider profiles are shown for GOO DAARI On-Demand Services.
