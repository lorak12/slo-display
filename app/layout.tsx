import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { MainFileRouter } from "./api/uploadthing/core";

const font = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={font.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(MainFileRouter)} />
        <main className="px-24 py-12 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
