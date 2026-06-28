import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Cursor } from "@/components/fx/Cursor";
import { cn } from "@/lib/utils";
import { SITE_URL } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Creative Monk — Growth, with intention.",
    template: "%s · Creative Monk",
  },
  description:
    "A full-service creative & digital growth studio from Chandigarh, India. Brand, web, performance marketing and motion under one roof.",
  keywords: [
    "digital marketing agency India",
    "creative studio Chandigarh",
    "brand design",
    "web development",
    "performance marketing",
    "Creative Monk",
  ],
  openGraph: {
    title: "Creative Monk — Growth, with intention.",
    description:
      "Brand, web, performance marketing and motion — engineered for compounding growth.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1c1c1e" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfb" },
  ],
  colorScheme: "dark light",
};

// Runs before paint — resolves the saved theme (default: system) and sets
// data-theme on <html> so there's no flash of the wrong theme.
const themeScript = `(function(){try{var p=new URLSearchParams(location.search).get('theme');if(p==='light'||p==='dark'||p==='system'){localStorage.setItem('cm-theme',p);}var t=localStorage.getItem('cm-theme')||'system';var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Creative Monk",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.png`,
  description:
    "A full-service creative & digital growth studio from Chandigarh, India — brand, web, performance marketing and motion under one roof.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zirakpur",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  sameAs: [
    "https://instagram.com/creativemonkindia",
    "https://facebook.com/creativemonkindia",
    "https://youtube.com/creativemonkindia",
  ],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Creative Monk",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(archivo.variable, inter.variable, spaceMono.variable)}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgJsonLd, siteJsonLd]) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollToTop />
        <Cursor />
      </body>
    </html>
  );
}
