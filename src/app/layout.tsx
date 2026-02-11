import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FavoritesDrawer from "@/components/FavoritesDrawer";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Warm Editorial Catalog",
    template: "%s · Warm Editorial Catalog",
  },
  description: "A warm editorial fashion catalog demo (no checkout).",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Warm Editorial Catalog",
    description: "Warm editorial fashion catalog demo (no checkout).",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <div className="min-h-dvh bg-paper text-ink">
          <Header />
          <FavoritesDrawer />
          <main className="mx-auto w-full max-w-[1280px] px-4 pb-16 pt-6 md:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
