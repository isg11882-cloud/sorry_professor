import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { GoogleAnalytics } from "@/components/google-analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "교수님 확인 부탁드립니다",
  description:
    "과제 마감 1분 전, 절박한 대학생들을 위한 지성인의 생존 전략! 교수님도 속아 넘어갈 완벽한 손상 파일을 생성해드립니다.",
  openGraph: {
    title: "교수님 확인 부탁드립니다",
    description:
      "과제 마감 1분 전, 절박한 대학생들을 위한 지성인의 생존 전략! 교수님도 속아 넘어갈 완벽한 손상 파일을 생성해드립니다.",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "교수님 확인 부탁드립니다 링크 프리뷰",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "교수님 확인 부탁드립니다",
    description:
      "과제 마감 1분 전, 절박한 대학생들을 위한 지성인의 생존 전략! 교수님도 속아 넘어갈 완벽한 손상 파일을 생성해드립니다.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
