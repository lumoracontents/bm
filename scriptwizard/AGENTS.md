# ScriptWizard Agent Handoff

## Project

ScriptWizard is a Korean digital content sales and LMS-style landing site. It sells only the owner's products:

- Ebook PDF: 19,000 KRW
- Video course: 79,000 KRW
- All-in-one package: 149,000 KRW
- 1:1 Zoom consulting: 250,000 KRW

The course topic is AI content repurposing: turning one YouTube video into blog posts, Threads posts, Instagram carousel copy, and YouTube Shorts scripts.

## Current Location

- Repository root: `F:\SSAP-Coding\ScriptWizard`
- App root: `F:\SSAP-Coding\ScriptWizard\scriptwizard`
- Git remote: `https://github.com/lumoracontents/BM.git`
- Vercel production URL: `https://scriptwizard.vercel.app`
- Vercel project: `lumoramedia/scriptwizard`

Vercel is linked from the app root, not the repository root.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Supabase client packages installed
- Vercel deployment
- Stubbed API routes for payments, webhooks, and video token issuance

Important commands from `scriptwizard`:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd exec --yes vercel -- deploy --prod --yes
```

## Environment And Secrets

Do not commit real environment files.

`.gitignore` intentionally excludes:

```gitignore
.env*
!.env.example
```

Allowed in Git:

- `.env.example`

Never commit:

- `.env`
- `.env.local`
- `.env.production`
- Supabase service role key
- Toss or Cloudflare secrets

The Supabase service role key exists only in local environment/Vercel settings workflow and must not be written into source files, docs, GitHub issues, PR bodies, screenshots, or logs.

## Search Verification

The site currently includes:

- Google Search Console HTML tag verification
- Naver Search Advisor meta tag verification

These are in `src/app/layout.tsx` under `metadata.verification`.

Keep both tags unless the owner explicitly asks to replace them.

## Recent Work

The main landing page was simplified and mobile optimized:

- Reduced landing page sections.
- Mobile hero heading uses explicit 3-line copy.
- Mobile header is shorter.
- Mobile CTA text is shortened to `신청`.
- 1:1 consulting is compact inside pricing instead of a long separate section.
- Google/Naver verification tags remain in production.

Primary files touched:

- `src/app/page.tsx`
- `src/components/site-header.tsx`
- `src/app/layout.tsx`

## Review Priorities

When another agent reviews or improves this project, prioritize:

1. Mobile polish
   - No horizontal scroll at 375px width.
   - Hero text should not break awkwardly.
   - Buttons should stay within parent width.
   - Cards should not feel over-spaced on mobile.

2. Korean copy integrity
   - Some PowerShell reads may show mojibake, but browser/build output has been valid.
   - Inspect files with UTF-8-aware tooling if editing Korean text.
   - Do not replace Korean copy with garbled output from a terminal display.

3. SEO/AEO/GEO
   - Preserve metadata, sitemap, robots, and JSON-LD.
   - Public pages should remain indexable.
   - Private/member pages should remain `robots: { index: false, follow: false }`.

4. Security
   - Never expose service role credentials.
   - Keep payment, webhook, video-token routes as stubs until real provider flows are implemented safely.
   - Keep Supabase RLS assumptions explicit before real LMS data access is built.

5. Deployment
   - Vercel deploys from the `scriptwizard` app root.
   - `https://scriptwizard.vercel.app` should stay the canonical public URL until a custom domain is purchased.

## Known Constraints

- GitHub push from this machine failed because local Git was authenticated as `Vincero1023`, which lacks push permission to `lumoracontents/BM`.
- Vercel deployment works through the logged-in Vercel account.
- Current production was deployed by CLI, not by GitHub auto-deploy.

## Acceptance Checks

Before handing off changes:

```powershell
npm.cmd run lint
npm.cmd run build
```

Then verify:

- `https://scriptwizard.vercel.app` returns 200 after deployment.
- `/sitemap.xml` returns 200.
- Google and Naver verification meta tags are still present.
- Mobile viewport around 390x844 has no horizontal scroll.
- Desktop hero around 1440x900 has no horizontal scroll and clean line breaks.
