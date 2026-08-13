import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://agomoni.vercel.app"),
  title: "আগমনী | Bengali Puja Nostalgia Radio",
  description:
    "আগমনী is a nostalgic Bengali Durga Puja music experience inspired by old para Puja evenings, family memories, traditional Bengali culture and timeless music.",
  openGraph: {
    title: "আগমনী | Bengali Puja Nostalgia Radio",
    description:
      "আগমনী is a nostalgic Bengali Durga Puja music experience inspired by old para Puja evenings, family memories, traditional Bengali culture and timeless music.",
    type: "website",
    locale: "bn_BD",
    images: [
      {
        url: "/bg/scene-wide.png",
        width: 1920,
        height: 1080,
        alt: "আগমনী — Bengali Puja Nostalgia Radio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "আগমনী | Bengali Puja Nostalgia Radio",
    description:
      "আগমনী is a nostalgic Bengali Durga Puja music experience inspired by old para Puja evenings, family memories, traditional Bengali culture and timeless music.",
    images: ["/bg/scene-wide.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
