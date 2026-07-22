"use client";

import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_ID, GTM_ID } from "@/lib/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a GA4 page_view on client-side route changes. The initial page_view is
 * sent by the gtag config below; App Router navigations don't reload the page,
 * so they'd otherwise go unrecorded.
 */
function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    const qs = searchParams.toString();
    window.gtag("event", "page_view", {
      page_path: qs ? `${pathname}?${qs}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * Google Analytics 4 (+ optional Tag Manager).
 *
 * gtag.js is loaded in the document head, which is what Search Console's
 * "Google Analytics" ownership verification requires. Everything is inert
 * unless the corresponding ID is configured.
 */
export function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script
            id="ga4-src"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
          <Suspense fallback={null}>
            <PageViews />
          </Suspense>
        </>
      )}

      {GTM_ID && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
    </>
  );
}
