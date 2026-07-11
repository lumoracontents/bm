# ScriptWizard 의존성·호환성 유지보수 보고서

- 점검 일시: 2026-07-11 20:55:55 KST
- GitHub repo: https://github.com/lumoracontents/bm
- 작업 브랜치: `maintenance/dependency-health-20260711`
- 기준 커밋: `2dca9c18659271905a84323a85e37d48dc8397b6`
- 앱 위치: `scriptwizard`
- 로컬 Node: `v22.23.1`
- 로컬 npm: `10.9.8`
- package engines: `node >=22 <23`
- production URL: https://scriptwizard.vercel.app
- MVP preview URL: https://scriptwizard-ech1jheck-lumoramedia.vercel.app/tools/content-pack

## 1. 프로젝트 이해

ScriptWizard는 유튜브 영상 하나를 블로그 글, 스레드/X 게시글, 인스타 카드뉴스, 유튜브 쇼츠 대본으로 재가공하는 AI 콘텐츠 자동화 교육·도구 사이트입니다.

현재 사이트가 제공하는 주요 기능과 서비스는 다음과 같습니다.

| 구분 | 내용 |
|---|---|
| 메인 랜딩 | AI 콘텐츠 자동화 클래스 소개, 추천 대상, 커리큘럼, 가격표 |
| 상품 | 전자책 PDF, 영상강의, 올인원 패키지, 1:1 줌 컨설팅 |
| 서비스 | 콘텐츠 리믹스 진단 리포트 |
| 도구 | 유튜브 스크립트 다운로드, AI 멀티채널 콘텐츠 패키지 생성기 MVP |
| 운영 기능 | 대시보드, 학습 페이지, 과제, 게시판, 관리자 백업 stub, 결제/webhook/video-token stub |
| 배포 | Vercel project `lumoramedia/scriptwizard` |

## 2. 이번 유지보수 목표

강의 과제 기준에 맞춰 다음을 수행했습니다.

1. GitHub 최신 코드 기반으로 작업 브랜치 생성
2. 프로젝트 라이브러리 outdated/audit 건강검진
3. 안전 범위 의존성 업데이트
4. 업데이트 후 lint/build/로컬 페이지 응답 확인
5. 운영과 직결되는 감시·유지·보수 체크리스트 작성
6. 보고서와 인수인계 파일 생성

## 3. 의존성 건강검진 결과

### 3.1 업데이트 전 outdated 주요 항목

| 패키지 | 기존 | wanted/latest | 조치 |
|---|---:|---:|---|
| `@supabase/supabase-js` | 2.110.0 | 2.110.2 | 업데이트 적용 |
| `eslint` | 9.39.4 | 9.39.5 / 10.7.0 | 안전 범위 9.39.5 적용, major 10은 보류 |
| `lucide-react` | 1.23.0 | 1.24.0 | 업데이트 적용 |
| `react` | 19.2.4 | latest 19.2.7 | Next/React 조합 영향 검토 필요, 보류 |
| `react-dom` | 19.2.4 | latest 19.2.7 | Next/React 조합 영향 검토 필요, 보류 |
| `typescript` | 5.9.3 | latest 7.0.2 | major 변경, 보류 |
| `@types/node` | 20.19.43 | latest 26.1.1 | Node 런타임 호환성 확인 필요, 보류 |

### 3.2 적용한 업데이트

| 패키지 | 변경 | 이유 |
|---|---|---|
| `@supabase/supabase-js` | 2.110.0 → 2.110.2 | Supabase client patch update |
| `eslint` | 9.39.4 → 9.39.5 | Lint tool patch update |
| `lucide-react` | 1.23.0 → 1.24.0 | Icon package minor/patch-compatible update |


### 3.3 업데이트 후 남은 outdated 항목

| 패키지 | current | wanted | latest | 판단 |
|---|---:|---:|---:|---|
| `@types/node` | 20.19.43 | 20.19.43 | 26.1.1 | Node/Vercel 런타임 호환성 확인 후 처리 권장 |
| `eslint` | 9.39.5 | 9.39.5 | 10.7.0 | 10.x major는 별도 검토 권장 |
| `react` | 19.2.4 | 19.2.4 | 19.2.7 | Next.js 16.2.10과 함께 묶어 회귀 테스트 후 처리 권장 |
| `react-dom` | 19.2.4 | 19.2.4 | 19.2.7 | Next.js 16.2.10과 함께 묶어 회귀 테스트 후 처리 권장 |
| `typescript` | 5.9.3 | 5.9.3 | 7.0.2 | major 업데이트라 별도 브랜치에서 처리 권장 |


## 4. 보안 audit 결과

업데이트 후 `npm audit --json` 기준:

| 심각도 | 건수 |
|---|---:|
| critical | 0 |
| high | 0 |
| moderate | 2 |
| low | 0 |
| total | 2 |

남은 보안 경고는 npm audit상 2개 항목으로 집계되지만, 실제 원인은 Next.js 내부 PostCSS advisory 1건이 `next`와 `postcss` 항목으로 함께 표시되는 구조입니다.

| 패키지 | 심각도 | 내용 | 판단 |
|---|---|---|---|
| `postcss` via `next` | moderate | PostCSS CSS stringify XSS advisory `GHSA-qx2v-qp2m-jg93` | Next.js 내부 의존성 경고. `npm audit fix --force`가 안전한 상위 패치가 아니라 비정상적인 큰 변경/다운그레이드 방향을 제안하므로 이번 브랜치에서는 미적용 |

`npm audit fix --dry-run`은 실행했지만 실제 수정은 하지 않았습니다. 이유는 자동 수정 제안이 운영 안정성보다 위험하다고 판단했기 때문입니다.


## 4-1. 런타임 호환성 확인

`@supabase/supabase-js@2.110.2`는 package-lock 기준 `node >=22.0.0`을 요구합니다. 따라서 이번 브랜치에서 `package.json`에 다음 engines 값을 명시했습니다.

```json
{"node": ">=22 <23"}
```

로컬 검증 환경:

```text
node_version=v22.23.1
npm_version=10.9.8
package_engines={"node":">=22 <23"}
```

주의: Vercel 프로젝트도 Node 22 런타임으로 맞춰야 합니다. Vercel이 Node 20으로 빌드하면 Supabase 패키지의 engines 요구사항과 어긋날 수 있습니다.

## 5. 업데이트 후 검증 결과

| 검증 | 결과 |
|---|---|
| `npm run lint` | PASS |
| `npm run build` | PASS |
| Next.js route build | `/tools/content-pack`, `/tools/youtube-transcript`, `/sitemap.xml` 포함 확인 |
| 로컬 `/` | 200 |
| 로컬 `/tools/content-pack` | 200 |
| 로컬 `/tools/youtube-transcript` | 200 |
| 로컬 `/dashboard` | 200 |
| 로컬 `/sitemap.xml` | 200 |
| 로컬 `/robots.txt` | 200 |
| production root | 200 |
| production `/tools/content-pack` | 404 — 아직 production 병합/배포 전이므로 이 route는 production 미검증 상태 |
| preview `/tools/content-pack` | 200 |

로컬 스모크 체크 원문:

```text
200 /
200 /tools/content-pack
200 /tools/youtube-transcript
200 /dashboard
200 /sitemap.xml
200 /robots.txt
content_pack_title=AI 멀티채널 콘텐츠 패키지 생성기

header_link=/tools/content-pack
```

원격 상태 체크 원문:

```text
production_root=200
production_content_pack=404
preview_content_pack=200
```

## 6. ScriptWizard 운영 핵심 감시 체크리스트

VPS 24/7 운영 또는 주 1회 워치독 대상으로 우선순위를 추렸습니다.

### 6.1 감시 Monitoring

| 우선순위 | 감시 대상 | 실패 시 영향 | 권장 주기 |
|---|---|---|---|
| 1 | production URL 200 응답 | 사이트 접속 신뢰 하락 | 5~15분 |
| 1 | Vercel deployment status | 배포 실패/롤백 필요 | 배포 직후 + 1시간 |
| 1 | `/sitemap.xml`, `/robots.txt` | 검색 노출/SEO 문제 | 매일 |
| 1 | `/dashboard`, `/learn`, `/resources` 200 응답 | 고객 학습/자료 접근 문제 | 15~60분 |
| 1 | 결제 confirm/webhook route 오류율 | 매출 직접 영향 | 실시간/로그 기반 |
| 2 | Supabase 연결/환경변수 누락 | 로그인/자료/게시판 기능 장애 | 매일 |
| 2 | Vercel preview protection/production alias | 제출/공유 링크 접근 문제 | 배포 시 |
| 2 | Google/Naver verification meta 유지 | 검색도구 인증 문제 | 주 1회 |
| 3 | AI 콘텐츠 도구 샘플 생성 UI | 리드 전환/서비스 체험 문제 | 주 1회 |

### 6.2 유지 Maintenance

| 항목 | 권장 방식 |
|---|---|
| npm outdated | 주 1회 실행 후 patch/minor만 우선 검토 |
| npm audit | 주 1회 실행, high/critical은 즉시 보고 |
| Next/React/TypeScript major | 별도 브랜치에서 lint/build/브라우저 검증 후 승인 병합 |
| Vercel 빌드 캐시/배포 로그 | 배포 실패 시 로그 저장 후 원인 분석 |
| GitHub 브랜치/PR | 작업마다 handoff/report 파일 갱신 |
| Hermes 인증 | Claude/Codex/Vercel/GitHub 인증 만료 시 알림 |

### 6.3 보수 Repair

| 상황 | 보수 절차 |
|---|---|
| build 실패 | 실패 로그 저장 → 원인 파일 특정 → 패치 → lint/build 재실행 |
| dependency 취약점 | audit 원문 저장 → safe fix와 force fix 분리 → force는 승인 후 별도 브랜치 |
| 외부 API 호환성 변경 | Supabase/Vercel/결제/AI API changelog 확인 → staging/preview 검증 |
| 사이트 5xx/404 증가 | 최근 배포 diff 확인 → 이전 정상 배포로 rollback 또는 hotfix |
| 로그인/대시보드 장애 | 환경변수, Supabase auth 설정, Vercel runtime log 확인 |

## 7. 이번 작업 판단

- 안전 업데이트 3건은 적용했고 검증 통과했습니다.
- 남은 moderate audit 2건은 Next 내부 PostCSS 경고입니다.
- 현재 `npm audit fix --force`는 운영 안정성을 해칠 수 있어 미적용이 안전합니다.
- 다음 주 점검 때 Next.js 안정 패치가 나오면 우선 확인해야 합니다.

## 8. 원본 증거 파일 위치

```text
scriptwizard/maintenance/reports/raw/npm-outdated.json
scriptwizard/maintenance/reports/raw/npm-audit.json
scriptwizard/maintenance/reports/raw/post-npm-outdated.json
scriptwizard/maintenance/reports/raw/post-npm-audit.json
scriptwizard/maintenance/reports/raw/npm-audit-fix-dry-run.txt
scriptwizard/maintenance/reports/raw/lint.txt
scriptwizard/maintenance/reports/raw/build.txt
scriptwizard/maintenance/reports/raw/local-smoke-check.txt
scriptwizard/maintenance/reports/raw/remote-site-status.txt
```

## 9. 결론

ScriptWizard는 현재 핵심 빌드와 주요 페이지 응답이 정상입니다. 안전 범위의 라이브러리 업데이트를 반영했고, 업데이트 후 사이트가 깨지지 않는 것을 lint/build/스모크 체크로 확인했습니다.

운영 관점에서는 production 사이트 응답, 결제/webhook route, Supabase 인증/환경변수, Vercel 배포 상태, sitemap/robots, 학습/대시보드 페이지를 핵심 워치독 대상으로 삼는 것이 적절합니다.
