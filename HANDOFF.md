# Handoff — Annika's Quinceañera invite

Last updated: 11 July 2026

## What this is

A web-based invitation for Annika's quinceañera. Built by copying the
`baby-shower-invite` project, redesigning the frontend, and pointing it at a new
Firebase backend.

| | |
|---|---|
| **Live site** | https://quinceanera-invite.vercel.app |
| **Repo** | https://github.com/adupontjr/quinceanera-invite (private) |
| **Local** | `C:\Users\jr\My Apps\quinceanera-invite` |
| **Hosting** | Vercel, auto-deploys on push to `main` |
| **Backend** | Firebase project `quinceanera-invite`, Firestore collection `rsvps` |
| **Stack** | Next.js 16, React 19, Tailwind v4, TypeScript |

## The event

- **Annika**, fifteenth birthday
- **Saturday, October 17, 2026, 6:00 pm** (dinner at 6:30)
- **18166 Andrea Court, Perris, CA 92570**
- Dress code: ranchero or cowboy; jeans and boots welcome
- Gifts: presence is enough, but gift cards and cash appreciated
- RSVP fallback contact: Ann Marie, +1 951-515-8039

## Design decisions already made

Don't relitigate these unless JR says so:

1. **Modern editorial**, not a copy of the printed invite — photos and
   typography carry the page.
2. **Cream background** (`#FDF6F2`) taken from the print piece, with **magenta**
   (`#B4165A`, pulled from her dress) as the single accent color.
3. **Cinematic intro** — her photo, Ken Burns push, name fades up, auto-advances
   after ~4s, skippable on any scroll or tap. Replaced the baby shower's envelope.
4. **Bilingual EN/ES** via a toggle (top right). Defaults to Spanish if the
   guest's browser is Spanish. Choice persists in `localStorage`.
5. **RSVP form is primary**, Ann Marie's phone number sits beneath it as backup.
6. **Selected elements from the printed invite** are being brought in: the rose
   wreath framing her photo, floral corner clusters, and the script typeface for
   her name. Not a full print translation.

## Where things live

```
app/
  config/event.ts      All event details, photo paths, ornament paths. Start here.
  config/copy.ts       Every guest-facing string, EN + ES. `Copy` type is derived
                       from the English object, so Spanish must match its shape.
  firebase/config.ts   Reads NEXT_PUBLIC_FIREBASE_* env vars. No secrets in repo.
  components/
    CinematicIntro.tsx  Opening reveal
    Hero.tsx            Script name + wreath-framed photo + date/time
    Countdown.tsx       Live countdown
    EventDetails.tsx    Punctuality, dinner, dress code
    LocationMap.tsx     Map embed + directions link
    Gifts.tsx           Gift wording
    RsvpForm.tsx        Form -> Firestore, calendar links, phone fallback
    LanguageProvider.tsx  EN/ES context + the toggle button
    Photo.tsx           Renders a photo, or a placeholder panel if the file is missing
    Ornament.tsx        Renders floral art, or nothing if the file is missing
    Reveal.tsx          Fade-up-on-scroll wrapper
  globals.css          Palette, type classes, animations
firestore.rules        Guests can create an RSVP; nobody can read/edit/delete
```

## ⚠️ Open items — pick up here

### 1. The photos are missing (blocking)

All three 404 on the live site. The `Photo` component degrades to a grey
placeholder, so nothing is broken, but the site is an empty frame until these land.

Save into `public/images/`:

| File | What it's for |
|---|---|
| `annika-hero.jpg` | Wreath centre + intro. Use the red sequin portrait against the blue backdrop. |
| `annika-1.jpg` | Beside the dress-code/dinner details. The seated one with the guitar works. |
| `annika-2.jpg` | Spare, not yet placed in the layout. |

### 2. The floral art has not been extracted (blocking the current design)

`Ornament` currently renders nothing because `wreath.png`,
`floral-corner-left.png` and `floral-corner-right.png` don't exist.

**Plan:** JR saves the two printed-invite images as `public/images/invite-page1.png`
and `invite-page2.png`. Then crop out the wreath and the two corner clusters and
knock the cream background out to transparency (Python + Pillow).

**Known risks:**
- The cream will not knock out cleanly. Soft watercolor edges and drop shadows
  over a textured cream field mean an automated threshold leaves faint halos,
  most visible where the wreath overlaps her photo.
- **Better option first:** the invite looks like it was made in Canva. If whoever
  made it can export the floral elements as PNGs *with transparency*, use those —
  they will beat anything reconstructed from a flattened scan.
- The wreath in the print is an **oval**, not a circle, and is clipped by the page
  edge. The `inset-[18%]` on the photo in `Hero.tsx` will likely need adjusting
  once the real art is composited.

### 3. Firestore rules must be re-published

The rules whitelist exact field names via `hasOnly()`. A `phone` field was added
to the form after the rules were last published. **If the rules in the Firebase
console are stale, every RSVP will be rejected.** Copy `firestore.rules` into
Firebase console → Firestore → Rules → Publish. Verify by submitting a test RSVP.

### 4. Decisions JR hasn't made yet

- **The map pins a home address on a public URL.** If 18166 Andrea Court is a
  residence, consider dropping the embed and leaving the address as text.
  Two-minute change in `LocationMap.tsx`.
- **No spam protection on the RSVP form.** Fine for a link shared privately; a
  problem if it circulates. Would need a captcha or App Check.
- **Email is required** on the form. It's the field most likely to make an older
  relative bail. Consider making it optional, or dropping it for phone.
- **Magenta on cream** — the accent was picked against an off-white background.
  Now that the base is warmer, it may read hot. Check it once the art is in.

## Working notes

- **`npm install` and `git` do not work reliably from the Claude sandbox inside
  `My Apps`** — the mount truncates writes, which silently corrupted a source file
  and a `.git/config` earlier. Work in a local copy (`/tmp`), then rsync back.
  Always verify with `md5sum` after copying files into the mount.
- **Headless Chrome won't run in the sandbox** (no root, missing `libXdamage`), so
  screenshots aren't possible. Verify visually on the Vercel deploy instead.
- `.env.local` exists locally and is gitignored. The same seven
  `NEXT_PUBLIC_FIREBASE_*` vars are set in Vercel.
- The GitHub PAT used to create the repo **should have been revoked**. If pushing
  from the sandbox again, a new one is needed.
- Firebase web API keys are public by design — they identify the project, they
  don't authorize anything. The Firestore rules are the actual security boundary.

## Deploying

```bash
cd "C:\Users\jr\My Apps\quinceanera-invite"
npm install          # first time only
npm run dev          # http://localhost:3000

git add .
git commit -m "your message"
git push             # Vercel redeploys automatically
```
