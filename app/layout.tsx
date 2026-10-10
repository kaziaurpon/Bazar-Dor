import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Ticker, { TickerSkeleton } from "@/components/Ticker";
import ToasterProvider from "@/components/ToasterProvider";

/**
 * Browser translators (Chrome Translate, Google Translate extension) and some extensions rewrite the
 * page's text nodes, which makes React crash with "insertBefore … is not a child of this node".
 * This tiny guard (a well known workaround) makes those two DOM calls fail safely instead.
 */
const DOM_GUARD = `(function(){if(typeof Node!=="function"||!Node.prototype)return;
var rc=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c&&c.parentNode!==this){return c;}return rc.apply(this,arguments);};
var ib=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,r){if(r&&r.parentNode!==this){return n;}return ib.apply(this,arguments);};})();`;

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর, দামের ওঠানামা এবং বাজারভিত্তিক তুলনা।",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05893e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" translate="no" data-theme="bazar" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
        <script dangerouslySetInnerHTML={{ __html: DOM_GUARD }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="notranslate flex min-h-screen flex-col" suppressHydrationWarning>
        <Navbar />
        <Suspense fallback={<TickerSkeleton />}>
          <Ticker />
        </Suspense>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
