import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "To-Do Web App",
  description: "A modern to-do list application built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins bg-[#2E3440] text-[#D8DEE9]`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
