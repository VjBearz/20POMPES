import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twenty Punch - Daily Push-up Challenge",
  description: "Track and improve your daily push-up routine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1 p-4 pb-24 md:pb-4">{children}</main>
            <Navigation />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}