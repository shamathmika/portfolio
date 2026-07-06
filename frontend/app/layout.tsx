import type { Metadata } from "next";
import { Syncopate, BBH_Bartle, Scope_One } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LeftPane } from "@/components/layout/LeftPane";
import { PullCord } from "@/components/PullCord";
import { ScrollingBrand } from "@/components/layout/ScrollingBrand";

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
});

const bbhBartle = BBH_Bartle({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bbh-bartle",
});

const scopeOne = Scope_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-scope-one",
});

export const metadata: Metadata = {
  title: "Shamathmika",
  description: "Software developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syncopate.variable} ${bbhBartle.variable} ${scopeOne.variable}`}
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <div className="pointer-events-none fixed left-0 top-0 z-[15] h-24 w-3/4 bg-background [mask-image:linear-gradient(to_right,black_60%,transparent),linear-gradient(to_bottom,black_50%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]" />
          <PullCord />
          <ScrollingBrand />
          <div className="flex">
            <LeftPane />
            <main className="min-w-0 max-w-6xl flex-1">{children}</main>
          </div>
          <footer className="px-6 py-8 text-center font-body text-xs opacity-60 sm:px-16">
            © 2026 Shamathmika. All rights reserved.
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
