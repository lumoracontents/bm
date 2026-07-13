# Codex Review — Dependency Maintenance 2026-07-11

## Scope

ScriptWizard dependency/compatibility maintenance branch:

- safe dependency updates
- package-lock consistency
- maintenance report
- raw evidence files
- handoff documentation

## Codex result

High:
None.

Medium:
- `@supabase/supabase-js@2.110.2` requires Node `>=22.0.0`; report needed Node/npm runtime evidence and project engines.
- `npm-audit-fix-dry-run.json` was not valid JSON because npm prepended text before the JSON object; evidence file should be renamed to `.txt` or captured as parseable JSON.

Low:
- Pre-update `npm ls --depth=0` evidence should be labeled as pre-update or accompanied by post-update evidence.
- Audit count should clarify that npm shows two moderate entries for one Next/PostCSS advisory path.
- Production `/tools/content-pack` 404 should be marked as not production-verified, not as a working production route.

Recommendation:
Fix the evidence/compatibility gaps before Google Drive submission. Package updates themselves look consistent, and lint/build evidence supports the update.

## Fixes applied after review

- Added `engines.node` to `scriptwizard/package.json`: `>=22 <23`.
- Captured runtime evidence in `maintenance/reports/raw/runtime-versions.txt`.
- Renamed audit dry-run evidence from `.json` to `.txt`.
- Added post-clean-install dependency evidence in `post-npm-ci-ls-depth0.txt`.
- Clarified production `/tools/content-pack` as not production-verified until merge/deploy.
- Clarified that npm audit reports two entries for one Next/PostCSS advisory path.

## Final verification after review fixes

- `npm ci --no-audit --no-fund`: PASS
- `npm run lint`: PASS
- `npm run build`: PASS
