import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
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
      <head>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N5PLMGMZ');`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y16RHSH9BB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-Y16RHSH9BB');`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N5PLMGMZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
