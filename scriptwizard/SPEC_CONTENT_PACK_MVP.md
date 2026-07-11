# SPEC — AI 멀티채널 콘텐츠 패키지 생성기 MVP

## 요청 기준

- GitHub repo: `https://github.com/lumoracontents/bm`
- 기준 브랜치: `main`
- 작업 브랜치: `feature/hermes-content-pack-mvp`
- 앱 위치: `scriptwizard`
- 배포 방식: 브랜치를 GitHub에 push해서 Vercel Preview URL 생성

## 서비스명

AI 멀티채널 콘텐츠 패키지 생성기

## 목표

ScriptWizard 사이트에 AI 기술을 포함한 서비스 MVP 페이지를 추가한다. 실제 AI API는 아직 연동하지 않고, 프론트엔드에서 입력값을 바탕으로 샘플 결과물을 생성해 보여준다.

## 새 페이지

- Path: `/tools/content-pack`
- 기존 ScriptWizard 디자인 톤과 맞춘다.
- 기존 `/tools/youtube-transcript` 도구 페이지, `site.ts`, `SiteHeader`, 메인 페이지의 서비스/도구 섹션 구조를 재사용한다.

## 입력

사용자가 아래 중 하나 이상을 입력할 수 있어야 한다.

- 유튜브 영상 링크
- 영상 제목
- 스크립트 일부

## 생성 결과물

프론트엔드 샘플 생성 결과로 아래 4가지를 보여준다.

1. 블로그 글 초안
2. 스레드/X 게시글
3. 인스타 카드뉴스 문구
4. 유튜브 쇼츠 대본

## 비즈니스 모델 표시

- 무료: 월 3회 생성
- Starter: 월 30회 생성
- Pro: 월 150회 생성
- Business: 월 500회 생성

## 링크 추가

- 메인 페이지 또는 헤더에서 `/tools/content-pack`으로 이동할 수 있는 링크를 추가한다.
- 모바일/데스크톱에서 기존 CTA가 깨지지 않게 한다.

## 완료 조건

- `npm run lint` 통과
- `npm run build` 통과
- 변경 파일 단위 Codex 리뷰 완료
- `feature/hermes-content-pack-mvp` 브랜치에 커밋
- GitHub push 시도
- push 성공 시 Vercel Preview URL 확인 및 보고
- push 인증 실패 시 로컬 커밋 해시와 인증 필요 내용을 한국어로 보고

## 금지/주의

- 실제 AI API key, secret, token을 추가하지 않는다.
- 지금은 서버 API route가 아니라 프론트엔드 샘플 생성으로 충분하다.
- `.env*` 파일을 만들거나 커밋하지 않는다.
- 운영 결제/개인정보 흐름을 건드리지 않는다.
