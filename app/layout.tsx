import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionButtons from "@/components/FloatingActionButtons";

const siteUrl = "https://www.hopa.kr";
const defaultTitle = "건대호빠 건대W | 010-9561-7332 준건실장";
const description =
  "건대호빠 건대W. 프라이빗한 공간, 완벽한 서비스. 베테랑 준건실장이 잊지 못할 최고의 순간을 만들어 드립니다. 지금 바로 예약하세요.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | 건대W"
  },
  description,
  keywords: [
    "건대호빠",
    "건대W",
    "건대호빠 예약",
    "건대W 예약",
    "건대 라운지",
    "광진구 호빠",
    "건대 하이엔드 라운지",
    "건대호빠 예약문의",
    "건대W 예약문의",
    "건대W 오시는길"
  ],
  alternates: {
    canonical: siteUrl
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "건대W",
    title: defaultTitle,
    description,
    images: [
      {
        url: "/images/seven%20(1).png",
        width: 2400,
        height: 1000,
        alt: "건대W 예약 상담"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
    images: ["/images/seven%20(1).png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  category: "nightlife"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <FloatingActionButtons />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
