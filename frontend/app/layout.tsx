import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Cursor } from "@/components/fx/Cursor";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { cn } from "@/lib/utils";
import { SITE_URL, GSC_VERIFICATION } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

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
  alternates: { canonical: "/" },
  openGraph: {
    title: "Creative Monk — Growth, with intention.",
    description:
      "Brand, web, performance marketing and motion — engineered for compounding growth.",
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Creative Monk",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Monk — Growth, with intention.",
    description:
      "Brand, web, performance marketing and motion — engineered for compounding growth.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  ...(GSC_VERIFICATION
    ? { verification: { google: GSC_VERIFICATION } }
    : {}),
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(archivo.variable, inter.variable, spaceMono.variable)}
    >
      <body>
        <Analytics />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollToTop />
        <Cursor />
      </body>
    </html>
  );
}
