import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
