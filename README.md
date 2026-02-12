# BitPoet Puzzles

Production-ready viral puzzles & quizzes web app powered by Next.js App Router, Payload CMS v3, Supabase, PostHog, and Sentry.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript + TailwindCSS + shadcn/ui
- Payload CMS v3 (integrated with Next.js)
- Supabase (Postgres + storage)
- PostHog (analytics)
- Sentry (errors)

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Configure environment variables

```bash
cp .env.example .env.local
```

3) Run Supabase SQL

Execute the schema in supabase/schema.sql.

4) Run the app

```bash
npm run dev
```

Open http://localhost:3000

## Payload Admin

Payload admin is available at /admin.

## Seeding

```bash
npm run seed
```

## Notes

- Placeholder SVGs are used in public/images. Replace with production assets.
- Analytics and error monitoring are enabled via environment keys.
