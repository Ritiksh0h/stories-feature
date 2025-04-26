import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stories Feature | Upload and View Stories",
  description:
    "A client-side responsive Stories feature where users can upload, view, and manage stories that automatically expire after 24 hours. Built with Next.js, TailwindCSS, and Framer Motion.",
  keywords: [
    "Stories",
    "Stories Feature",
    "Next.js",
    "TailwindCSS",
    "Framer Motion",
    "Client-side project",
    "Instagram Stories Clone",
    "Upload Images",
    "Responsive Design",
  ],
  authors: [{ name: "Ritik shah", url: "https://ritikshah.vercel.app" }],
  creator: "Ritik Shah",
  icons: {
    icon: "/favicon.ico", // if you have a favicon
  },
  metadataBase: new URL("https://stories-feature.vercel.app"), // put your domain here if deployed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
