import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import BottomNav from "@/components/bottomNav";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Merrylow - UG based food delivery platform",
  description: "We deliver meals from your favourite restaurants on campus right to your doorstep",
};



export const viewport = {
  maximumScale: 1,
  userScalable: false
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
          {children}
        <BottomNav />
      </body> */}
      <body>
        <Navbar />
          {children}
        <BottomNav />
      </body>
    </html>
  );
}
