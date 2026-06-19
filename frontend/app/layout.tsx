import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { cn } from "@/lib/utils";

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
  metadataBase: new URL("https://thecreativemonk.in"),
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
  themeColor: "#FCFCFB",
  colorScheme: "light",
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
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollToTop />
      </body>
    </html>
  );
}
