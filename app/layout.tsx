import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "GigCredit AI - Credit Scores for Gig Workers",
  description: "India's first credit scoring platform for gig workers. Rapido drivers, Swiggy/Zomato delivery, freelancers.",
  manifest: "/manifest.json",
};

import { ProtectedRoute } from '@/Frontend/components/ProtectedRoute';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-bg-light dark:bg-bg-dark text-foreground antialiased")}>
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </body>
    </html>
  );
}
