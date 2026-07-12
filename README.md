# Quinceañera Invitation

A web-based invitation built with Next.js 16, React 19, Tailwind CSS v4, and Firebase Firestore for RSVPs.

## Editing the event

Every detail — names, date, venue, gift link, copy — lives in **`app/config/event.ts`**.
Change it there and the invitation, countdown, map, calendar links, and page metadata all follow.

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in the Firebase values
npm run dev
```

Open http://localhost:3000

## Firebase setup

1. Create a new project in the [Firebase console](https://console.firebase.google.com).
2. Create a **Firestore Database** (production mode).
3. Add a **Web app** to the project and copy the SDK config values into `.env.local`.
4. Publish the rules in `firestore.rules` — they let guests submit an RSVP but never read or modify others'.

RSVPs land in the `rsvps` collection. Read them from the Firestore console.

## Deployment

Deployed on Vercel from the `main` branch. The same `NEXT_PUBLIC_FIREBASE_*` variables must be
set under **Project Settings → Environment Variables**.

## Project structure

```
app/
  config/event.ts      All event details in one place
  firebase/config.ts   Firebase init (reads env vars)
  components/
    EnvelopeIntro.tsx  Tap-to-open envelope animation
    Countdown.tsx      Live countdown to the event
    LocationMap.tsx    Venue details + embedded map
    RegistryLink.tsx   Gift/registry link (hidden if unset)
    RsvpForm.tsx       RSVP form + calendar links
  globals.css          Palette, glassmorphism, animations
  layout.tsx           Fonts and metadata
  page.tsx             Invitation layout
```
