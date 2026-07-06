# ScriptWizard

ScriptWizard는 유튜브 영상 하나를 블로그, 스레드, 인스타 카드뉴스, 유튜브 쇼츠 대본으로 재가공하는 AI 콘텐츠 자동화 클래스 판매 사이트입니다.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- Supabase Auth, Postgres, RLS, Storage
- Toss Payments 결제위젯 연동 준비
- Cloudflare Stream signed token 연동 준비
- Vercel 배포 기준

## Routes

- `/` 랜딩 페이지
- `/products/ebook`, `/products/course`, `/products/all-in-one` 상품 상세
- `/consulting` 1:1 줌 컨설팅
- `/faq` 구매 전 질문
- `/blog` 콘텐츠 전략 블로그
- `/dashboard`, `/learn`, `/resources`, `/assignments`, `/board` 수강생 영역
- `/admin` 관리자 영역

## Local Development

```bash
npm install
npm run dev
```

BM 저장소 루트 아래 `scriptwizard` 폴더가 실제 Vercel 프로젝트 루트입니다. Vercel에서 Root Directory를 `scriptwizard`로 설정하세요.

## Environment

`.env.example`을 기준으로 Supabase, Toss Payments, Cloudflare Stream 값을 설정합니다.

```bash
cp .env.example .env.local
```

현재 결제 확인, 웹훅, 영상 토큰 API는 환경변수가 없으면 스텁 응답을 반환합니다. 실제 운영에서는 Toss 승인 호출, 웹훅 서명 검증, Supabase `entitlements` 생성, Cloudflare Stream signed token 발급을 연결해야 합니다.

## Database

초기 Supabase 스키마는 `supabase/schema.sql`에 있습니다. 상품, 주문, 구매 권한, 강의, 자료, 과제, 게시판, 상담 예약 테이블과 기본 RLS 정책을 포함합니다.
