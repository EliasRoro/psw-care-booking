# PSW Care Booking

A mobile-first home care booking app for Ontario, built with Expo, TypeScript, Expo Router, and Supabase. The app helps families request non-clinical home support and helps vetted PSWs accept visits, check in/out, and stay organized.

## Overview

This project follows the MVP spec in `SPEC.md` and is structured around a small milestone-based build plan:

- Role-based sign up and login
- Client booking flow
- PSW onboarding and availability flow
- Review and scheduling screens
- Supabase-ready configuration for auth and future database work

## Tech stack

- Expo / React Native
- Expo Router
- TypeScript
- Supabase Auth
- AsyncStorage for session persistence

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Add your Supabase values:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Start the app:
   ```bash
   npm start
   ```

## Project structure

```text
.
├── src/
│   ├── app/
│   ├── data/
│   └── lib/
├── .env.example
├── .gitignore
├── app.json
├── SPEC.md
├── package.json
├── tsconfig.json
└── README.md
```

## Important notes

- Do not commit `.env` values.
- This is a non-clinical home care app and should not store medical diagnoses or clinical records.
- The app is designed to evolve toward Supabase database tables, Stripe test-mode payments, and admin tools.

## Current status

This repository currently contains the project foundation and the first milestone implementation for onboarding and booking UX, including:

- welcome screen
- sign-up and login screens
- role selection
- booking flow screens
- caregiver and schedule preview screens
- Supabase client setup

## Database milestone

The project has also started the database layer in `supabase/migrations/001_initial_schema.sql` and `supabase/README.md`.

This migration includes the core tables for the PSW booking app and enables Row Level Security on every table. Each policy is documented in plain language in the Supabase README so the app is designed with privacy and access control in mind.

The migration now also creates profiles automatically when a Client or PSW signs up, prevents self-service admin role escalation, and constrains booking, document, review, and status writes by role. It still needs to be applied to a real Supabase project before production data is used.

## License

This project is provided as a starting point for a PSW booking MVP and is not medical advice.
