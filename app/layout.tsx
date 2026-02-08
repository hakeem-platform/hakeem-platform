import React from "react"
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic",
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-naskh-arabic",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0c7792",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://hakeemplatform.com"),
  title: {
    default:
      "منصة الحكيم للخدمات الطلابية | بحوث ومشاريع أكاديمية احترافية",
    template: "%s | منصة الحكيم للخدمات الطلابية",
  },
  description:
    "منصة الحكيم للخدمات الطلابية - نقدم خدمات كتابة البحوث والمشاريع الجامعية والعروض التقديمية والتنسيق الأكاديمي. متخصصون في طلاب الجامعة السعودية الإلكترونية - قسم الصحة العامة وبرامج الماجستير التنفيذي. جودة عالية، دقة، وسرية تامة.",
  keywords: [
    "منصة الحكيم",
    "خدمات طلابية",
    "بحوث أكاديمية",
    "مشاريع جامعية",
    "عروض تقديمية",
    "تنسيق أكاديمي",
    "الجامعة السعودية الإلكترونية",
    "ماجستير جودة الرعاية الصحية",
    "ماجستير إدارة الرعاية الصحية",
    "سلامة المرضى",
    "الصحة العامة",
    "خدمات برمجية",
    "مواقع ويب",
    "بحوث تخرج",
    "مساعدة أكاديمية",
  ],
  authors: [{ name: "منصة الحكيم للخدمات الطلابية" }],
  creator: "منصة الحكيم",
  publisher: "منصة الحكيم للخدمات الطلابية",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://hakeemplatform.com",
    siteName: "منصة الحكيم للخدمات الطلابية",
    title:
      "منصة الحكيم للخدمات الطلابية | بحوث ومشاريع أكاديمية احترافية",
    description:
      "نقدم خدمات كتابة البحوث والمشاريع الجامعية والعروض التقديمية والتنسيق الأكاديمي. متخصصون في طلاب الجامعة السعودية الإلكترونية.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "منصة الحكيم للخدمات الطلابية | بحوث ومشاريع أكاديمية احترافية",
    description:
      "نقدم خدمات كتابة البحوث والمشاريع الجامعية والعروض التقديمية والتنسيق الأكاديمي.",
  },
  alternates: {
    canonical: "https://hakeemplatform.com",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="canonical" href="https://hakeemplatform.com" />
        <meta name="geo.region" content="SA" />
        <meta name="geo.placename" content="Saudi Arabia" />
        <meta name="language" content="Arabic" />
      </head>
      <body
        className={`${ibmPlexArabic.variable} ${notoNaskhArabic.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
