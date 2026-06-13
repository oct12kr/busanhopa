import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionButtons from "@/components/FloatingActionButtons";

const siteUrl = "https://daejeon-seven-night.com";
const title =
  "건대W | 건대호빠 예약 상담";
const description =
  "건대W 건대호빠 예약 상담 페이지. 서울특별시 광진구 아차산로33길 16-10 방문 전 가격, 시간대, 룸 분위기, 주류 세트, 드레스코드, 재방문 케어까지 안내해 드립니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
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
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "건대W",
    title,
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
    title,
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
