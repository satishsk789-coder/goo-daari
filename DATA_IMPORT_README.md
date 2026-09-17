# GOO DAARI website database import

- Source workbook: GOO_DAARI_East_Godavari_Expansion_Batch3.xlsx
- Source Seed Listings rows: 147
- User-facing listing records after removing research-only/demand-evidence rows and deduplicating: 128
- Research/Prospect/Discovered status is preserved. No listing is presented as GOO DAARI Verified unless the source status says so.
- The Excel workbook remains the internal master database. The website consumes data.js.
- New locations represented in the database are selectable from the location dropdown.
