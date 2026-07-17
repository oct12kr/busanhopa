import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import { businessName, managerName, phoneDisplay, siteUrl } from "@/lib/constants";

const defaultTitle = `${businessName} | ${phoneDisplay} ${managerName}`;
const description =
  `${businessName}. 부산 해운대 영무파라드 호텔 지하 2층 프라이빗 라운지 예약 상담. 올리브세이지와 샌드베이지 톤의 차분한 VIP 공간을 ${managerName}가 안내해드립니다.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${businessName}`
  },
  description,
  keywords: [
    "부산호빠",
    "부산 호빠",
    "해운대호빠",
    "부산호빠 예약",
    "부산 프리미엄 라운지",
    "해운대 프라이빗 라운지",
    "부산 VIP룸",
    "부산 예약문의",
    "부산호빠"
  ],
  alternates: {
    canonical: siteUrl
  },
  applicationName: businessName,
  authors: [{ name: businessName, url: siteUrl }],
  creator: businessName,
  publisher: businessName,
  icons: {
    icon: [
      {
        url: "/busanhostbar-icon.svg",
        type: "image/svg+xml"
      }
    ],
    shortcut: "/busanhostbar-icon.svg",
    apple: "/busanhostbar-icon.svg"
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: businessName,
    title: defaultTitle,
    description,
    images: [
      {
        url: "/images/000.png",
        width: 2400,
        height: 1000,
        alt: `${businessName} 예약 상담`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
    images: ["/images/000.png"]
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#151812"
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
