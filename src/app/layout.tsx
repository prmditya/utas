import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "@/components/providers/providers";
import { AppSidebar } from "@/components/app-sidebar";
import PageShell from "@/components/page-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Utas",
  description: "Twitter clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>
          <AppSidebar />
          <PageShell>{children}</PageShell>
        </Providers>
      </body>
    </html>
  );
}
