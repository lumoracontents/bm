import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ScriptWizard | AI 콘텐츠 자동화 클래스",
    template: "%s | ScriptWizard",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  verification: {
    google: "GAAboQ9Kj0ijLGe8yPi3WZb1Pq0DwD-GMcGZiUSAcBA",
    other: {
      "naver-site-verification": "df7423bf2fba9b91adc3a6ef2a53d8c56974e736",
    },
  },
  keywords: [
    "AI 콘텐츠 자동화",
    "유튜브 블로그 변환",
    "쇼츠 대본",
    "인스타 카드뉴스",
    "스레드 콘텐츠",
    "디지털 강의",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "ScriptWizard | AI 콘텐츠 자동화 클래스",
    description: siteConfig.description,
    images: [
      {
        url: "/images/scriptwizard-hero.png",
        width: 1536,
        height: 1024,
        alt: "ScriptWizard AI 콘텐츠 자동화 클래스 화면",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScriptWizard | AI 콘텐츠 자동화 클래스",
    description: siteConfig.description,
    images: ["/images/scriptwizard-hero.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#183028",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
