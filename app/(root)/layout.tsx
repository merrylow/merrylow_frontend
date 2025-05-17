import React from 'react'
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import '../globals.css'
import Header from '@/components/header'
import BottomNav from '@/components/bottomNav'
import { Toaster } from '@/components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import PushNotificationManager from '@/components/pwa-manager/pushNotificationManager'
import InstallPrompt from '@/components/pwa-manager/installPrompt'
import LoadingOverlay from '@/components/loadingOverlay'
import ClientLayoutShell from '@/components/clientLayoutShell'
// import { Toaster } from 'react-hot-toast'

// const rubik = Rubik({
//   subsets: ['latin'],
//   display: 'swap'
// });
//
// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// })

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: 'Merrylow - UG-based food delivery platform',
  description: 'We deliver meals from your favourite restaurants on campus right to your doorstep',
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
      <GoogleOAuthProvider clientId={process.env.AUTH_GOOGLE_ID!}>
    <html lang='en' className={nunitoSans.className}>
      <body>

        <Header />
        {/*<PushNotificationManager />*/}
        {/*<InstallPrompt />*/}
          {children}
        <BottomNav />

        <LoadingOverlay />
        <ClientLayoutShell children={undefined} />
        <Toaster />
      </body>
    </html>
      </GoogleOAuthProvider>
  );
}