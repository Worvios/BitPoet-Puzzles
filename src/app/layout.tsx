import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/app/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BitPoet Puzzles — Viral Puzzles & Quizzes",
    template: "%s · BitPoet Puzzles",
  },
  description:
    "Daily viral puzzles, memory games, and timed quizzes built for retention and shareability.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    title: "BitPoet Puzzles — Viral Puzzles & Quizzes",
    description:
      "Play daily viral puzzles, memory games, and timed quizzes. Share your score and climb the leaderboard.",
    images: ["/og-default.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BitPoet Puzzles — Viral Puzzles & Quizzes",
    description:
      "Play daily viral puzzles, memory games, and timed quizzes. Share your score and climb the leaderboard.",
    images: ["/og-default.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />
            <main className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
              {children}
            </main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
