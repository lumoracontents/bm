export const siteConfig = {
  name: "ScriptWizard",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://scriptwizard.kr",
  description:
    "유튜브 영상 하나를 블로그, 스레드, 인스타 카드뉴스, 유튜브 쇼츠 대본으로 바꾸는 AI 콘텐츠 자동화 실전 강의입니다.",
  mainCopy: "유튜브 영상 하나를 멀티채널 콘텐츠로 바꾸는 AI 콘텐츠 자동화 클래스",
  contactEmail: "hello@scriptwizard.kr",
};

export type ProductSlug = "ebook" | "course" | "all-in-one";

export type Product = {
  slug: ProductSlug;
  name: string;
  price: number;
  eyebrow: string;
  summary: string;
  description: string;
  includes: string[];
  bestFor: string;
  cta: string;
  highlighted?: boolean;
};

export const products: Product[] = [
  {
    slug: "ebook",
    name: "전자책 PDF",
    price: 19000,
    eyebrow: "입문 자료",
    summary: "콘텐츠 재가공 프로세스를 빠르게 훑고 바로 적용하는 PDF 가이드",
    description:
      "유튜브 영상에서 핵심 메시지를 뽑고 블로그, 스레드, 카드뉴스, 쇼츠 대본으로 재구성하는 전체 흐름을 문서로 정리했습니다.",
    includes: ["AI 프롬프트 템플릿", "블로그 구조 예시", "카드뉴스 기획표", "쇼츠 대본 체크리스트"],
    bestFor: "먼저 시스템을 이해하고 직접 적용해 보고 싶은 1인 창작자",
    cta: "PDF 구매하기",
  },
  {
    slug: "course",
    name: "영상강의",
    price: 79000,
    eyebrow: "실전 강의",
    summary: "강의를 보며 자동화 흐름을 따라 만드는 실습형 클래스",
    description:
      "원본 영상 분석부터 멀티채널 산출물 작성까지 실제 작업 화면 중심으로 따라 만들 수 있는 영상 강의입니다.",
    includes: ["모듈별 실습 영상", "작업 파일", "과제 제출 가이드", "수강생 게시판 접근"],
    bestFor: "혼자 적용하다 막히는 지점을 강의로 빠르게 해결하고 싶은 분",
    cta: "영상강의 수강하기",
  },
  {
    slug: "all-in-one",
    name: "올인원 패키지",
    price: 149000,
    eyebrow: "추천 패키지",
    summary: "전자책, 영상강의, 템플릿, 과제 흐름을 한 번에 제공하는 핵심 상품",
    description:
      "ScriptWizard의 전체 콘텐츠 자동화 운영법을 가장 완성도 있게 가져갈 수 있는 패키지입니다.",
    includes: ["전자책 PDF 전체", "영상강의 전체", "자동화 템플릿 묶음", "과제 제출 및 피드백 게시판"],
    bestFor: "유튜브 한 편을 여러 채널 콘텐츠 자산으로 반복 생산하고 싶은 분",
    cta: "올인원 시작하기",
    highlighted: true,
  },
];

export const consulting = {
  name: "1:1 줌 컨설팅",
  price: 250000,
  summary: "내 채널과 콘텐츠 상황에 맞춰 자동화 흐름을 함께 설계하는 집중 세션",
  includes: ["사전 질문지", "60분 줌 미팅", "채널별 콘텐츠 재가공 진단", "실행 우선순위 정리"],
};

export const remixAuditService = {
  slug: "remix-audit",
  name: "콘텐츠 리믹스 진단 리포트",
  price: 49000,
  eyebrow: "신규 서비스",
  summary:
    "유튜브 영상 1편을 분석해 블로그, 스레드, 카드뉴스, 쇼츠 대본으로 재가공하는 실행 리포트",
  description:
    "원본 유튜브 영상 링크와 채널 목표를 제출하면, 어떤 메시지를 어떤 채널 콘텐츠로 바꿀지 진단하고 7일 실행 순서까지 정리한 PDF 리포트를 제공합니다.",
  includes: [
    "영상 핵심 메시지 진단",
    "채널별 재가공 아이디어",
    "블로그·스레드·카드뉴스·쇼츠 구성안",
    "7일 발행 액션 플랜",
  ],
  bestFor:
    "강의를 구매하기 전 내 영상이 실제로 어떤 콘텐츠 자산으로 바뀔 수 있는지 먼저 확인하고 싶은 창작자",
  turnaround: "영업일 기준 2일 이내",
  cta: "진단 리포트 신청하기",
};

export const youtubeTranscriptTool = {
  slug: "youtube-transcript",
  name: "유튜브 스크립트 다운로드",
  eyebrow: "신규 자동화 도구",
  summary: "유튜브 링크를 넣으면 영상 스크립트를 TXT 파일로 내려받는 콘텐츠 원본 확보 도구",
  description:
    "영상 링크를 입력해 스크립트를 저장하고, 이후 블로그·스레드·카드뉴스·쇼츠 대본 재가공의 원본 자료로 바로 사용할 수 있게 설계한 기능형 서비스입니다.",
  cta: "스크립트 다운로드",
  freeQuota: 10,
  paidMultipliers: [10, 50, 100],
};

export const contentPackTool = {
  slug: "content-pack",
  name: "AI 멀티채널 콘텐츠 패키지 생성기",
  eyebrow: "AI 샘플 생성 MVP",
  summary:
    "유튜브 링크, 영상 제목, 스크립트 일부를 넣으면 블로그·스레드/X·인스타 카드뉴스·쇼츠 대본 샘플을 한 번에 보여주는 도구",
  description:
    "실제 AI API 연동 전, 입력값 기반 샘플 결과로 멀티채널 콘텐츠 패키지 생성 흐름과 구독형 비즈니스 모델을 검증하는 MVP입니다.",
  cta: "샘플 패키지 생성",
  freeQuota: 3,
};

export const contentPackPlans = [
  {
    name: "Free",
    price: 0,
    monthlyQuota: 3,
    summary: "월 3회 샘플 생성으로 콘텐츠 패키지 흐름을 먼저 확인",
    features: ["4종 결과물 샘플", "브라우저 내 즉시 생성", "AI API 미연동 MVP 체험"],
  },
  {
    name: "Starter",
    price: 19000,
    monthlyQuota: 30,
    summary: "월 30회 생성, 1인 창작자와 소규모 채널용",
    features: ["월 30회 생성", "채널별 초안 저장 확장 예정", "블로그·SNS 발행 체크리스트"],
  },
  {
    name: "Pro",
    price: 49000,
    monthlyQuota: 150,
    summary: "월 150회 생성, 꾸준히 발행하는 콘텐츠 운영자용",
    features: ["월 150회 생성", "콘텐츠 묶음 관리 확장 예정", "팀 리뷰 워크플로 준비"],
    highlighted: true,
  },
  {
    name: "Business",
    price: 149000,
    monthlyQuota: 500,
    summary: "월 500회 생성, 교육·마케팅 팀의 대량 운영용",
    features: ["월 500회 생성", "브랜드 톤 프리셋 확장 예정", "우선 처리 한도 설계"],
  },
];

export const transcriptPlans = [
  {
    name: "Free",
    price: 0,
    monthlyQuota: 10,
    summary: "월 10개 영상까지 무료로 스크립트 다운로드",
    features: ["기본 TXT 다운로드", "유튜브 링크 분석", "개인 학습용 사용"],
  },
  {
    name: "Starter",
    price: 9900,
    monthlyQuota: 100,
    summary: "무료 사용량의 10배, 가벼운 1인 창작자용",
    features: ["월 100개 다운로드", "스크립트 파일명 자동 정리", "기본 콘텐츠 재가공 메모"],
  },
  {
    name: "Creator",
    price: 29000,
    monthlyQuota: 500,
    summary: "무료 사용량의 50배, 꾸준히 발행하는 채널용",
    features: ["월 500개 다운로드", "대량 작업 큐 설계", "채널별 작업 기록"],
    highlighted: true,
  },
  {
    name: "Pro",
    price: 59000,
    monthlyQuota: 1000,
    summary: "무료 사용량의 100배, 팀 단위 콘텐츠 운영용",
    features: ["월 1,000개 다운로드", "팀 작업용 다운로드 기록", "우선 처리 한도"],
  },
];

export const audience = [
  "유튜브 영상을 만들지만 블로그, 인스타, 스레드까지 확장하지 못하는 창작자",
  "AI 도구를 써도 결과물이 산만해서 실제 발행까지 이어지지 않는 1인 사업자",
  "반복 콘텐츠 제작 시간을 줄이고 주 1회 이상 꾸준히 발행하고 싶은 마케터",
  "강의, 코칭, 지식 상품을 운영하며 검색 유입과 SNS 유입을 함께 키우고 싶은 분",
];

export const outcomes = [
  {
    title: "검색형 블로그 글",
    body: "영상 핵심 메시지를 제목, 목차, 본문, CTA가 있는 글로 바꿉니다.",
  },
  {
    title: "스레드 연재문",
    body: "영상 내용을 짧고 이어 읽기 쉬운 포인트 중심 글로 분해합니다.",
  },
  {
    title: "인스타 카드뉴스",
    body: "한 장씩 넘기며 이해되는 카드 흐름과 슬라이드 문구를 만듭니다.",
  },
  {
    title: "유튜브 쇼츠 대본",
    body: "훅, 전개, 반전, CTA가 있는 짧은 영상 대본으로 재가공합니다.",
  },
];

export const curriculum = [
  "유튜브 영상에서 메시지, 타깃, 검색 키워드 추출하기",
  "AI에게 원본 영상 맥락을 잃지 않게 전달하는 프롬프트 구조",
  "블로그 글로 재가공할 때 제목, 목차, 문단을 잡는 방식",
  "스레드와 카드뉴스로 쪼개는 짧은 문장 설계법",
  "쇼츠 대본을 위한 훅, 리듬, 컷 분할 작성법",
  "반복 가능한 콘텐츠 자동화 워크플로 만들기",
];

export const resources = [
  "멀티채널 콘텐츠 변환 프롬프트",
  "블로그 SEO 초안 템플릿",
  "카드뉴스 10장 구성표",
  "쇼츠 대본 30초 구조표",
  "과제 제출용 체크리스트",
];

export const faqs = [
  {
    question: "AI를 처음 써도 수강할 수 있나요?",
    answer:
      "가능합니다. 도구 사용법보다 원본 콘텐츠를 어떻게 해석하고 재가공할지에 초점을 맞춰 설명합니다.",
  },
  {
    question: "전자책과 영상강의의 차이는 무엇인가요?",
    answer:
      "전자책은 전체 흐름과 템플릿을 빠르게 적용하는 자료이고, 영상강의는 실제 작업 과정을 보며 따라 만드는 실습형 상품입니다.",
  },
  {
    question: "구매 후 자료는 어디서 확인하나요?",
    answer:
      "첫 버전에서는 로그인 후 대시보드에서 강의, PDF 자료, 과제 제출, 게시판을 확인하는 구조로 설계합니다.",
  },
  {
    question: "1:1 줌 컨설팅은 어떤 방식인가요?",
    answer:
      "결제 후 사전 질문지를 받고, 현재 콘텐츠와 채널 목표에 맞는 재가공 워크플로를 60분 동안 함께 설계합니다.",
  },
];

export const blogPosts = [
  {
    slug: "youtube-to-blog-workflow",
    title: "유튜브 영상을 검색형 블로그 글로 바꾸는 기본 워크플로",
    excerpt: "영상 요약이 아니라 검색 의도, 목차, CTA까지 이어지는 재가공 흐름을 정리합니다.",
    category: "블로그 자동화",
  },
  {
    slug: "shorts-script-from-long-video",
    title: "긴 영상에서 쇼츠 대본을 뽑을 때 놓치기 쉬운 3가지",
    excerpt: "짧은 영상은 요약보다 훅과 리듬이 중요합니다. 원본 메시지를 살리는 분해법을 다룹니다.",
    category: "쇼츠 대본",
  },
  {
    slug: "instagram-carousel-content-system",
    title: "인스타 카드뉴스를 매번 새로 만들지 않는 콘텐츠 시스템",
    excerpt: "한 편의 영상에서 카드뉴스 흐름을 반복 생산하는 템플릿 구조를 소개합니다.",
    category: "카드뉴스",
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("ko-KR").format(price) + "원";
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
