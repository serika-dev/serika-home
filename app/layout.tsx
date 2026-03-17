import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "./components/Navbar";
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
  metadataBase: new URL("https://serika.dev"),
  title: {
    default: "The Serika Company",
    template: "%s | The Serika Company",
  },
  description:
    "Serika builds an interconnected ecosystem of AI, media, social, identity, and developer tools for the modern internet.",
  keywords: [
    "Serika",
    "Serika Company",
    "Serika.dev",
    "Serika Video",
    "Serika Booru",
    "AI platform",
    "developer tools",
    "social platform",
    "identity",
    "video streaming",
    "search",
    "browser",
    "IDE",
  ],
  openGraph: {
    title: "The Serika Company",
    description:
      "Open ecosystem of interconnected services: AI, media, social, identity, and developer experiences.",
    url: "https://serika.dev",
    siteName: "Serika",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Serika Company",
    description:
      "An open ecosystem of AI, media, social, identity, and developer services.",
    creator: "@serika",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://serika.dev",
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="ld-json-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Serika",
              url: "https://serika.dev",
              sameAs: [
                "https://serika.dev",
                "https://serika.app",
                "https://serika.art",
                "https://toka.serika.dev",
                "https://accounts.serika.dev",
              ],
              logo: "https://serika.dev/logo.png",
              description:
                "Serika builds an interconnected ecosystem of AI, media, social, identity, and developer tools.",
              hasPart: [
                { "@type": "WebSite", name: "Serika Dev", url: "https://serika.dev" },
                { "@type": "WebSite", name: "Serika App", url: "https://serika.app" },
                { "@type": "WebSite", name: "Serika Art", url: "https://serika.art" },
                { "@type": "WebSite", name: "Toka", url: "https://toka.serika.dev" },
                { "@type": "WebSite", name: "Accounts", url: "https://accounts.serika.dev" },
              ],
            }),
          }}
        />
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
