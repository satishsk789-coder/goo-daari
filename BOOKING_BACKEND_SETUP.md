# GOO DAARI Booking Backend — Vercel + Resend only

The on-demand forms submit to the same-origin Vercel endpoint:

`POST /api/book-service`

The API validates the request, creates a booking ID, and emails the complete request to GOO DAARI through Resend. There is **no Supabase/database dependency** in this version.

## 1. Create/verify your Resend account

Use Resend for transactional email. Verify the sending domain if you want to send from `@goodaari.com`.

## 2. Add Vercel environment variables

In **Vercel → GOO DAARI → Settings → Environment Variables**, add these to **Production**:

- `RESEND_API_KEY` = your Resend API key
- `RESEND_FROM` = e.g. `GOO DAARI <bookings@goodaari.com>`
- `BOOKING_EMAIL` = the GOO DAARI inbox that should receive requests

Do not put the Resend API key in HTML, client-side JavaScript, GitHub, or any `NEXT_PUBLIC_*` variable.

## 3. Deploy

Commit/push the project to GitHub and let Vercel deploy the new commit. Environment-variable changes apply to new deployments.

## 4. Test

Submit a test request from any of the eight on-demand pages. Expected result:

- The customer sees the success screen.
- A `GD-YYYYMMDD-XXXXXXXX` booking ID is generated.
- GOO DAARI receives a structured email.
- Vercel Runtime Logs show `POST /api/book-service` with a 200 response.

## 5. Future upgrade

When booking volume grows, the API can be extended to store bookings, assign providers, send WhatsApp updates and power an admin dashboard. The customer-facing forms do not need to change.
