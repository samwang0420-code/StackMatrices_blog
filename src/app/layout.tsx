import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.image,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE_CONFIG.twitter,
    creator: SITE_CONFIG.twitter,
    images: [SITE_CONFIG.image],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3c3cf6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-background-light antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
