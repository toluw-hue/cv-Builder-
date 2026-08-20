import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CVProvider } from "@/context/CVContext";

export const metadata: Metadata = {
  title: "CV Builder Pro — Build Stunning CVs in Minutes",
  description: "The most powerful and beautiful CV builder. Create professional resumes with 3 stunning templates. Better than LinkedIn. Download as PDF for just ₦500.",
  keywords: ["CV builder", "resume builder", "Nigerian CV", "professional CV", "PDF resume", "job application"],
  authors: [{ name: "CV Builder Pro" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CV Builder Pro",
  },
  openGraph: {
    title: "CV Builder Pro",
    description: "Build stunning professional CVs in minutes. Better than LinkedIn.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="google-adsense-account" content="ca-pub-1051258812836481" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1051258812836481"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <CVProvider>{children}</CVProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
