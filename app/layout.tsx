import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShipKit — Launch your Next.js SaaS in days, not months",
  description:
    "Stop rebuilding auth, Stripe, and email from scratch. ShipKit is a production-ready Next.js SaaS boilerplate with everything pre-wired.",
  openGraph: {
    title: "ShipKit — Launch your Next.js SaaS in days, not months",
    description:
      "Stop rebuilding auth, Stripe, and email from scratch. ShipKit is a production-ready Next.js SaaS boilerplate.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
