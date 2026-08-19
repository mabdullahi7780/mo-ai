import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mo AI — Intelligence Engineered into Every Workflow",
  description:
    "Mo AI builds custom CRMs, GoHighLevel systems, autonomous AI agents and high-performance web. Eight systems live in production across four countries.",
  openGraph: {
    title: "Mo AI — Intelligence Engineered into Every Workflow",
    description:
      "Custom CRM architecture, GHL engineering, autonomous AI agents and modern web. 10,000+ leads processed, 60+ automations running live.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  metadataBase: new URL("https://mo-ai.vercel.app"),
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-void text-ink antialiased">{children}</body>
    </html>
  );
}
