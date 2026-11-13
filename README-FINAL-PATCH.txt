GOO DAARI — FINAL LAYOUT & FUNCTIONALITY PATCH
================================================

This is a small patch for the latest source ZIP supplied by the user.
It contains 12 files and preserves the existing repository structure.

CHANGES
-------
1. Removes the location dropdown from the homepage header.
2. Hides the shared header location selector across pages using the shared stylesheet.
3. Disables stale localStorage location filtering in app.js so listings/search are no longer silently restricted to a previously selected town.
4. Repairs the duplicated/overlapping homepage "Why people use GOO DAARI" block and replaces it with one normal-flow responsive trust strip.
5. Keeps the homepage Projects & Rentals section and its existing category links.
6. Adds correctly matched hero images to JCB, scaffolding, cement and TMT pages.
7. Clarifies that the concrete mixer/RMC page is specifically about ready-mix concrete delivered by transit mixer trucks, not small portable drum mixers.
8. Adds responsive image styling for Projects & Rentals pages.

NOT CHANGED
-----------
- Existing customer booking forms and their submission handlers.
- Provider registration page and agreement.
- Existing service page content and SEO metadata.
- Existing project enquiry form endpoint and Web3Forms integration.
- Existing sitemap and URL structure.

GITHUB UPLOAD
-------------
Extract this ZIP. Upload/replace these 12 files at the same paths in the repository root.
Do not upload the parent folder as an extra nested directory.
Commit to the production branch (usually main), then wait for Vercel to deploy.

VALIDATION PERFORMED
--------------------
- HTML parsing on the homepage and all seven Projects & Rentals pages.
- Checked all project page H1, title, meta description and canonical tags.
- Checked all images referenced by Projects & Rentals pages exist and have alt text.
- Checked every Projects & Rentals enquiry form remains present.
- Checked homepage has no visible search input, no location selector, one trust strip, one Projects & Rentals section and one Interiors & Renovation card.
- JavaScript syntax checked with Node for app.js and Projects & Rentals form handler.
- Static local-link audit found 27 pre-existing missing business-detail links in the Rajahmundry, Kakinada and Pithapuram directory pages. These are not introduced by this patch and are not changed here.

LIMITATIONS
-----------
The browser automation environment blocked localhost browser navigation, so visual rendering and live Web3Forms submission could not be fully tested here.
After deployment, manually test one enquiry on each Projects & Rentals form and one existing customer booking form.
