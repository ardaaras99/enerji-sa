import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tekin Power - Yenilenebilir Enerji Çözümleri ve LiFePO4 Bataryalar",
  description: "Tekin Power, marin, solar enerji sistemleri, ebus, drone, golf araçları, forklift, carport ve solar pole alanlarında yenilikçi enerji çözümleri sunar. LiFePO4 bataryalar ile sürdürülebilir bir gelecek inşa ediyoruz.",
  keywords: "Tekin Power, yenilenebilir enerji, LiFePO4 batarya, solar panel, güneş enerjisi, marin enerji sistemleri, enerji depolama, sürdürülebilir enerji",
  authors: [{ name: "Tekin Power Energy" }],
  creator: "Tekin Power Energy",
  publisher: "Tekin Power Energy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tekinpower.com"),
  icons: {
    icon: "/tekinpowerlogos/tekinpower-04.png",
    shortcut: "/tekinpowerlogos/tekinpower-04.png",
    apple: "/tekinpowerlogos/tekinpower-04.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tekin Power - Yenilenebilir Enerji Çözümleri",
    description: "Tekin Power, marin, solar enerji sistemleri ve LiFePO4 bataryalar ile sürdürülebilir enerji çözümleri sunar.",
    url: "https://tekinpower.com",
    siteName: "Tekin Power Energy",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/tekinpowerlogos/tekinpower-02.png",
        width: 800,
        height: 600,
        alt: "Tekin Power Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tekin Power - Yenilenebilir Enerji Çözümleri",
    description: "Tekin Power, marin, solar enerji sistemleri ve LiFePO4 bataryalar ile sürdürülebilir enerji çözümleri sunar.",
    images: ["/tekinpowerlogos/tekinpower-02.png"],
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E3143T4CYP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E3143T4CYP');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
