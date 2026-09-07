import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import WhatsappIcon from "@/components/shared/WhatasappIcon";
import { Toaster } from 'react-hot-toast'
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Celestique",
  description: "The modern e-commerce site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hanken.variable} ${fraunces.variable} ${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans text-ink antialiased`}
      >
        <Navbar />
        <div className="flex-1">{children}</div>
        <WhatsappIcon />
        <Toaster position="bottom-left" toastOptions={{
          // Global default options
          success: {
            style: {
              background: 'green',
              color: 'white',
            },
          },
          error: {
            style: {
              background: 'red',
              color: 'white',
            },
          },
        }} />
        <Footer />
      </body>
    </html>
  );
}
