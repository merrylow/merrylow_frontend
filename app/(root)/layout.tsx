import React from 'react'
import type { Metadata } from "next";
import { Rubik, Inter,  } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import BottomNav from "@/components/bottomNav";
// import { Toaster } from 'react-hot-toast'
import { Toaster } from '@/components/ui/sonner'

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})



export const metadata: Metadata = {
  title: "Merrylow - UG-based food delivery platform",
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
    <html lang="en" className={inter.className}>
      <body>
        <Navbar />
          {children}
        <BottomNav />

        <Toaster />
      </body>
    </html>
  );
}