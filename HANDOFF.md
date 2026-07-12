# Handoff — Annika's Quinceañera invite

Last updated: 12 July 2026

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
6. **Floral art is watercolor botanical** — a rose wreath framing her photo and
   two corner clusters. Originally the plan was to lift these off the printed
   invite; they were generated instead. See open item 2 below for why.
7. **The hero photo is split in two.** The wreath's oval interior is small, so a
   full-length shot rendered her face too small to read. The wreath now frames a
   close portrait; the full-length shot carries the cinematic intro instead.

## Where things live

```
app/
  config/event.ts      All event details, photo paths, ornament paths. Start here.
  config/copy.ts       Every guest-facing string, EN + ES. `Copy` type is derived
                       from the English object, so Spanish must match its shape.
  firebase/config.ts   Reads NEXT_PUBLIC_FIREBASE_* env vars. No secrets in repo.
  components/
    CinematicIntro.tsx  Opening reveal — uses photos.intro
    Hero.tsx            Script name + wreath-framed photo + date/time
    Countdown.tsx       Live countdown
    EventDetails.tsx    Punctuality, dinner, dress code — uses photos.gallery[0]
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

## Code changed on 12 July 2026

Three files, all minimal:

- **`app/config/event.ts`** — added `photos.intro`. `hero` and `intro` are now
  two different photos (see design decision 7).
- **`app/components/CinematicIntro.tsx`** — now reads `photos.intro` instead of
  sharing `photos.hero` with the Hero.
- **`app/components/Hero.tsx`** — the photo inset was retuned from
  `inset-[18%]` to **`inset-x-[28%] inset-y-[21%]`**.

### How that inset was derived (read this before swapping the wreath art)

The old `inset-[18%]` was a guess and it was wrong — the photo would have spilled
about 11% past the ring and shown through the gaps between the leaves.

1. Measured the wreath's **actual** transparent oval by closing the opaque mask
   (to bridge the gaps between stems), filling holes, and taking the largest
   enclosed region: **x 157→695, y 269→1001** of the 848×1264 PNG — a
   **539×733 px** oval, taller than wide.
2. Accounted for `object-contain` letterboxing. The Hero container is
   `aspect-square`, but the wreath is 848/1264 = **67.09%** of the square's
   width, so it fits by height and sits inside a **16.46% letterbox** on each
   side. Mapping image pixels to container percentages:
   `fx = 0.1646 + (x/848) × 0.6709`, `fy = y/1264`
   → left 28.9%, right 28.6%, top 21.3%, bottom 20.8%.
3. Pulled in ~0.5–1% so the photo tucks *under* the inner foliage (the wreath is
   drawn on top of the photo), leaving no cream hairline and no photo edge
   bleeding through the ring's gaps.

**If the wreath art is ever regenerated or swapped, this value must be
recomputed.** It is specific to that PNG's oval.

## Open items — pick up here

### 1. Photos — DONE

All three are in `public/images/`, optimized (max 2000px long edge, quality 82,
progressive, EXIF stripped). ~1 MB total for four files.

| File | Photo | Used by |
|---|---|---|
| `annika-hero.jpg` | The "15" balloon close-up | Wreath centre (Hero) |
| `annika-intro.jpg` | Full-length, red sequin dress, blue backdrop | Cinematic intro |
| `annika-1.jpg` | Seated with the soccer ball, warm bokeh | Beside the details section |
| `annika-2.jpg` | (duplicate of the intro shot) | **Nothing** |

**This changed from the original plan.** The old plan pointed the wreath *and*
the intro at one `annika-hero.jpg` (the full-length shot). Inside the wreath's
small oval her face came out tiny, so the hero was split: the close-up goes in
the wreath, the full-length shot went full-bleed behind the Ken Burns push.

**Loose end:** `annika-2.jpg` is byte-identical to `annika-intro.jpg`, and
`photos.gallery[1]` — the only thing that would reference it — is referenced by
no component at all. It's 199 KB of dead weight. **Delete the file and drop the
`gallery[1]` entry from `event.ts`** unless you have a use for a second gallery
slot.

### 2. Floral art — DONE, but not the way this doc originally planned

The wreath (`wreath.png`) and both corner clusters (`floral-corner-left.png`,
`floral-corner-right.png`) are in `public/images/` with clean alpha.

They were **AI-generated (Gemini) as watercolor botanicals**, not cropped out of
the printed invite. That sidesteps the whole risk list the old plan worried
about — no cream knockout, no halos over her photo, no fighting the drop shadows
in a flattened scan. The old Canva-export idea is moot.

**Gotcha if you ever regenerate these.** The images came back as **flattened
screenshots with the transparency checkerboard baked into the pixels** — RGB,
no alpha channel at all. The alpha had to be reconstructed from scratch:

- background detected as **achromatic + bright** (chroma ≤ 5–7, luma ≥ 168), not
  a naive global brightness threshold — a global threshold eats the pale sage
  leaves and punches holes in the cream/white roses;
- **connectivity-based**, so bright highlights *enclosed* by petals stay opaque;
- **enclosed checker-pockets removed** by detecting the checker grey specifically
  (its value differs per image — auto-detect it, don't hardcode);
- **soft anti-aliased feather** from a normalized-convolution local-background
  estimate, so the watercolor edges fade instead of looking cut out;
- **edge decontamination** — semi-transparent pixels take their colour from the
  nearest solid artwork pixel, or the checker grey survives as a fringe on cream.

Each was verified by compositing over `#FDF6F2` and checking for a rectangular
ghost, surviving checker squares, and halos. All clean.

**Palette note, deliberate:** the generated florals came out **wine/burgundy**,
not the spec'd magenta `#B4165A`. This was accepted as an improvement — it sits
richer on the cream and doesn't fight her red dress. **So the site's magenta UI
accent and the floral art are not the same hue.** That is on purpose. Don't
"fix" it by recolouring the flowers to match the accent.

### 3. Firestore rules — DONE

JR has republished the rules. The `phone` field the form added is now whitelisted
in `hasOnly()`, so RSVPs are no longer rejected.

### 4. Decisions JR hasn't made yet

- **The map pins a home address on a public URL.** Explicitly deferred — "we'll
  talk about the map later." If 18166 Andrea Court is a residence, the embed can
  be dropped for plain text in a two-minute change in `LocationMap.tsx`.
- **No spam protection on the RSVP form.** Fine for a link shared privately; a
  problem if it circulates. Would need a captcha or App Check.
- **Email is required** on the form. It's the field most likely to make an older
  relative bail. Consider making it optional, or dropping it for phone.

## Working notes

### ⚠️ The `My Apps` mount — read this before touching git

Two *separate* failure modes. The old note here only described the first one:

1. **It truncates writes.** It has silently corrupted a source file and a
   `.git/config` before. In this session every write actually landed clean and
   md5-verified on the first attempt, so it may be intermittent — but **keep
   md5-verifying anyway.** The failure is silent, which is the whole problem.
2. **It blocks `unlink`** (`Operation not permitted`). This is the one that
   breaks git. Git creates `.git/index.lock` for every operation and deletes it
   afterwards; the delete fails, the stale lock stays, and the next git write
   dies with:
   ```
   fatal: Unable to create '.git/index.lock': File exists.
   ```

**The stale lock has been cleared** and everything below is committed and pushed.
If a `fatal: Unable to create '.git/index.lock': File exists.` appears again,
delete the file — `rm -f .git/index.lock` works from the sandbox once Cowork has
been granted delete permission on the folder, otherwise `del .git\index.lock`
from a real terminal.

There may be orphaned `.git/objects/*/tmp_obj_*` files (~2 MB) from the same
unlink failure — harmless litter, `git fsck` reports the object store clean.

**Practical rule:** work in a local copy (`/tmp`), rsync into the mount, verify
with `md5sum`. Git *does* work from the sandbox against the mount — the commit
and push on 12 July were both done that way — but the stale-lock failure mode is
real, so check for the lock first if git misbehaves.

### Other notes

- **Headless Chrome won't run in the sandbox** (no root, missing `libXdamage`), so
  screenshots aren't possible. Verify visually on the Vercel deploy instead.
- `.env.local` exists locally and is gitignored. The same seven
  `NEXT_PUBLIC_FIREBASE_*` vars are set in Vercel.
- The GitHub PAT used to create the repo **should have been revoked**. The push
  below will likely prompt for a fresh credential.
- Firebase web API keys are public by design — they identify the project, they
  don't authorize anything. The Firestore rules are the actual security boundary.

## Shipped — everything above is live

Committed as `f4542ff` ("feat: add photos, floral art, and fix wreath photo
inset") and pushed to `main` on 12 July. Vercel has redeployed. All six assets
were verified serving **200** on the live site:

```
annika-hero.jpg  annika-intro.jpg  annika-1.jpg
wreath.png  floral-corner-left.png  floral-corner-right.png
```

The site now has her photos and the floral art on it for the first time.

### Not yet reviewed by a human

Nobody has actually *looked* at the deployed result. Headless Chrome won't run in
the sandbox, so this was verified by HTTP status only — the files load, but
whether the composition works is unconfirmed. Check on the live site:

- the wreath's oval framing the circular photo crop (the `inset-x-[28%]
  inset-y-[21%]` was derived by eye, not measured — see the note further up)
- the floral corners at the top of the hero
- the magenta UI accent against the cream background, now that the real art is in

### ⚠️ Two files are byte-identical

`annika-intro.jpg` and `annika-2.jpg` have the same MD5 (`fd2e8e77…`). The
full-length shot used for the opening reveal is also sitting in the gallery slot.
Harmless today — `annika-2.jpg` isn't placed in the layout — but if those were
meant to be different photos, one of them is the wrong file.

## Deploying

```bash
cd "C:\Users\jr\My Apps\quinceanera-invite"
npm install          # first time only
npm run dev          # http://localhost:3000
```
