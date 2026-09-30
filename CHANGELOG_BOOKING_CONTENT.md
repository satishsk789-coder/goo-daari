# GOO DAARI — Booking & Content Update

## Booking backend
- Removed the Supabase/database dependency.
- All eight on-demand forms now submit to `/api/book-service` on the same Vercel deployment.
- The API validates the request and sends a structured email through Resend.
- Every successful request gets a `GD-YYYYMMDD-XXXXXXXX` booking ID.
- The frontend shows the booking ID after successful submission.
- Future database, provider assignment, WhatsApp and admin-dashboard fields remain conceptually supported without changing the customer-facing forms.

## Content
- Reworked the eight service-page hero copy to be broader and more neutral.
- Removed "verified/onboarding" claims from service-page hero/status copy.
- Added a simple Telugu explanation on every on-demand service page.
- Added a clearer Telugu explanation on the homepage and the main services page.
- Kept the existing service-specific FAQs and practical information while making the primary positioning more generic.

## Vercel setup
Required Production environment variables:
- `RESEND_API_KEY`
- `RESEND_FROM`
- `BOOKING_EMAIL`

No Supabase variables are required.
