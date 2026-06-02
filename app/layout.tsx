import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// title: 27자 / description: 67자 (한글 권장 범위 이내)
export const metadata: Metadata = {
  title: {
    default: "씨앤에스디자인 | 상업 인테리어 디자인 스튜디오",
    template: "%s | 씨앤에스디자인",
  },
  description:
    "상업 공간·호텔·카페·피트니스·사무실 인테리어 전문 씨앤에스디자인. 공간이 말하는 이야기를 함께 디자인합니다.",
  keywords: [
    "인테리어 디자인",
    "상업 인테리어",
    "씨앤에스디자인",
    "호텔 인테리어",
    "카페 인테리어",
    "사무실 인테리어",
    "피트니스 인테리어",
    "인천 인테리어",
  ],
  authors: [{ name: "씨앤에스디자인" }],
  creator: "씨앤에스디자인",
  publisher: "씨앤에스디자인",
  openGraph: {
    title: "씨앤에스디자인 | 상업 인테리어 디자인 스튜디오",   // 27자
    description:
      "상업 공간·호텔·카페·피트니스·사무실 인테리어 전문 씨앤에스디자인. 공간이 말하는 이야기를 함께 디자인합니다.",  // 47자
    url: "https://www.cnsdesign.co.kr",
    siteName: "씨앤에스디자인",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "씨앤에스디자인" }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "씨앤에스디자인 | 상업 인테리어 디자인 스튜디오",   // 27자
    description: "상업 공간·호텔·카페·피트니스·사무실 인테리어 전문 씨앤에스디자인.",  // 34자
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
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
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
