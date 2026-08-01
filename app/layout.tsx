import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionButtons from "@/components/FloatingActionButtons";
import { businessName, siteUrl } from "@/lib/constants";
import { absoluteAssetUrl, buildMetaDescription, buildMetaTitle, canonicalUrl, defaultSeo } from "@/lib/seo";

const fallbackTitle = buildMetaTitle(defaultSeo.fallbackTitle);
const fallbackDescription = buildMetaDescription({
  description: defaultSeo.fallbackDescription
});
const defaultOgImage = absoluteAssetUrl(defaultSeo.defaultImage);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: fallbackTitle,
  description: fallbackDescription,
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
    canonical: canonicalUrl("/")
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
    locale: defaultSeo.locale,
    url: canonicalUrl("/"),
    siteName: defaultSeo.siteName,
    title: fallbackTitle,
    description: fallbackDescription,
    images: [
      {
        url: defaultOgImage,
        width: 2400,
        height: 1000,
        alt: `${businessName} 예약 상담`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: fallbackTitle,
    description: fallbackDescription,
    images: [defaultOgImage]
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
