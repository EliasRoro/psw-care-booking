# PSW Care Booking App: MVP Spec (v1)

> Paste this file into your project as `SPEC.md`. In Copilot Chat, say: "Read SPEC.md. We will build it one milestone at a time. Start with Milestone 1 and explain each step in plain language."

## 0. Rules for the AI assistant (paste these first)

- I am a non-technical founder. Explain what you are doing in plain language.
- Work in small steps: one milestone, one feature at a time. Run and test before moving on.
- Use TypeScript. Ask before adding any new dependency.
- Never put passwords, API keys, or secrets in code. Use a `.env` file and make sure it is in `.gitignore`.
- Use Stripe **test mode** only until I say otherwise.
- Every database table needs Row Level Security. Explain each policy you write.
- Do not store medical diagnoses or clinical records anywhere.

## 1. Product summary

A mobile app in Ontario, Canada where families book vetted Personal Support Workers (PSWs) for non-clinical home care. The client pays through the app, and the platform pays the PSW on a fixed schedule. Launch is in one city.

## 2. Users and roles

Role
Who
Main goals

Client
Family member booking care for themselves or a loved one
Request a visit, see who is coming, pay, rate

PSW
Verified personal support worker
Complete onboarding, accept visits, check in/out, get paid

Admin
Founder/ops team
Approve PSWs, match bookings, handle refunds and incidents

## 3. Tech stack

- **App:** Expo (React Native) with TypeScript and Expo Router. One codebase for iOS and Android.
- **Backend:** Supabase (Postgres, Auth, Storage). Choose the Canadian region (ca-central-1) if offered.
- **Payments:** Stripe Connect (Canada). Stripe handles card data and identity checks. We never store card numbers.
- **Notifications:** Expo push notifications, plus email for confirmations.
- **Admin:** Use the Supabase dashboard plus a simple protected admin screen for version 1.

## 4. Version 1 features

### Client

- Sign up and log in (email and password), with consent screen and privacy policy link
- Create a care request: date, start time, duration, address, service type, non-clinical notes
- See the assigned PSW (first name, photo, verified badges, rating)
- Confirm the booking and pay (card authorized at booking, charged after the visit)
- View upcoming and past bookings, cancel per the cancellation policy
- Rate the PSW after a visit and optionally add a tip

### PSW

- Sign up and complete an onboarding checklist: PSW certificate, vulnerable sector check, first aid/CPR, immunization record, 2 references, HSCPOA registration number (optional for now)
- Upload documents to a private storage bucket (status: pending, approved, rejected)
- Connect a Stripe payout account
- Set availability
- Accept or decline visit offers
- Check in and check out with timestamps (optional location capture, with consent)
- See earnings, a per-visit pay breakdown, and the next payout date

### Admin

- Approve or reject PSW documents
- See all bookings and manually assign a PSW to a request
- Issue refunds, mark no-shows, and log incidents

### Out of scope for v1

In-app chat, automatic matching, video calls, medical records, insurance or government billing, multiple cities, reports and analytics, ratings for clients.

## 5. Service menu (non-clinical only)

Companionship, personal care assistance (bathing, dressing, toileting), mobility and transfers, meal preparation, light housekeeping, **medication reminders (reminders only)**.

Not offered: medication administration, injections, wound care, or anything requiring a regulated health professional. Show this clearly to clients when booking.

## 6. Data model (starting point)

- `profiles`: id, role, first_name, last_name, phone, created_at
- `client_addresses`: id, client_id, street, city, postal_code, access_notes
- `psw_profiles`: id, bio, photo_url, years_experience, status (pending/approved/suspended), hscpoa_number
- `psw_documents`: id, psw_id, type, file_path, status, reviewed_by, reviewed_at, expires_at
- `psw_availability`: id, psw_id, weekday, start_time, end_time
- `service_types`: id, name, description
- `bookings`: id, client_id, psw_id, address_id, service_type_id, start_time, duration_hours, status, client_price, psw_pay, platform_fee, notes
- `booking_events`: id, booking_id, type (offered, accepted, checked_in, checked_out, cancelled), timestamp, lat, lng
- `payments`: id, booking_id, stripe_payment_intent_id, amount, status
- `payouts`: id, psw_id, stripe_transfer_id, amount, pay_period_start, pay_period_end, paid_at
- `reviews`: id, booking_id, rating, comment
- `incidents`: id, booking_id, reported_by, description, status
- `audit_log`: id, actor_id, action, table_name, record_id, timestamp

## 7. Booking statuses

`requested` → `offered` → `accepted` → `confirmed` → `in_progress` → `completed` → `paid_out`

Other statuses: `cancelled`, `no_show`, `disputed`.

## 8. Payment rules

- Authorize the client's card when the booking is confirmed. Capture after check-out.
- Pay PSWs on a **fixed, recurring pay day** (weekly or bi-weekly). Show each PSW a written pay breakdown before they accept a visit.
- Tips go 100% to the PSW.
- Cancellation policy (draft, confirm with your lawyer): free cancellation more than 24 hours before the visit; a short-notice cancellation pays the PSW a minimum amount.
- Keep pay records for at least 3 years.

## 9. Privacy and security requirements

- Row Level Security on every table. Clients only see their own bookings. PSWs only see bookings assigned to them.
- A PSW sees the client's full address only after the booking is confirmed.
- PSW documents go in a private bucket and are viewed through short-lived signed links.
- Store the minimum personal data. Notes fields must warn users: "Do not enter medical diagnoses."
- All secrets in environment variables. Never commit `.env`.
- Log admin actions in `audit_log`.
- Include account deletion and data export in a settings screen.
- Data hosted in Canada where possible.

## 10. Screens

**Shared:** Welcome, Sign up, Log in, Settings (profile, privacy, delete account)

**Client:** Home, New Request, Booking Detail, Payment, My Bookings, Rate Visit

**PSW:** Onboarding Checklist, Document Upload, Availability, Visit Offers, Visit Detail (check in/out), Earnings

**Admin:** PSW Approvals, All Bookings, Assign PSW, Incidents

## 11. Build order and starter prompts

Milestone
Goal
Starter prompt

1
Project and login
"Set up an Expo TypeScript app with Expo Router and Supabase auth. Users choose a role at sign-up (client or PSW)."

2
Database
"Create the Supabase tables from section 6 with Row Level Security. Explain each policy."

3
Client booking
"Build the New Request and My Bookings screens using the bookings table."

4
PSW onboarding and offers
"Build the PSW onboarding checklist with document upload and the Visit Offers screen."

5
Check-in/out
"Add check-in and check-out to Visit Detail and save booking_events."

6
Payments
"Integrate Stripe Connect in test mode: authorize at booking, capture after check-out, payouts on a schedule."

7
Admin
"Build the PSW Approvals and Assign PSW screens, protected by the admin role."

8
Notifications
"Add push and email notifications for new offers, confirmations, and reminders."

9
Testing and review
"Write tests for booking and payment flows. List every security risk you can find."

## 12. Definition of done for v1

- A client can request, confirm, pay for, and rate a visit using test accounts.
- A PSW can be approved, accept a visit, check in and out, and see a payout.
- No user can see another user's data (tested with two accounts of each role).
- No secrets are in the repository.
- A human reviewer has checked the payment, login, and data-access code.

## 13. Questions for your lawyer (not for code)

- Is a Temporary Help Agency licence required for this model?
- How should PSWs be classified, and what should the worker agreement say?
- Does Ontario's Digital Platform Workers' Rights Act apply to home care, and what pay and record-keeping rules follow?
- What must the privacy policy say under PIPEDA and PHIPA?
