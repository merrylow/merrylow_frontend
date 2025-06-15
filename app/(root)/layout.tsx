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
import BetaToastTrigger from '@/components/betaToastTrigger'

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
  const CLIENT_ID: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!

  return (
      <GoogleOAuthProvider clientId={CLIENT_ID}>
    <html lang='en' className={nunitoSans.className}>
      <body>

        <Toaster />
        <Header />
        {/*<PushNotificationManager />*/}
        {/*<InstallPrompt />*/}
          {children}
        <BetaToastTrigger />
        <BottomNav />

        <LoadingOverlay />
        <ClientLayoutShell children={undefined} />
      </body>
    </html>
      </GoogleOAuthProvider>
  );
}