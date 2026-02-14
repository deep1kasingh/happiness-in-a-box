import type { Metadata } from "next";
import { Outfit, Fraunces } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const sans = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://happiness-in-a-box.vercel.app"),
  title: "Happiness in a Box",
  description:
    "Daily paths for mind, body and breath. Track your streak and grow.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Happiness in a Box",
    description:
      "Daily paths for mind, body and breath. Track your streak and grow.",
    siteName: "Happiness in a Box",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happiness in a Box",
    description:
      "Daily paths for mind, body and breath. Track your streak and grow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
