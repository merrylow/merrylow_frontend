import React from 'react'
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import '../globals.css'
import { Toaster } from '@/components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import LoadingOverlay from '@/components/loadingOverlay'
import ClientLayoutShell from '@/components/clientLayoutShell'
import BetaToastTrigger from '@/components/betaToastTrigger'


const nunitoSans = Nunito_Sans({
     subsets: ['latin'],
     display: 'swap',
})


export const metadata: Metadata = {
     title: "Merrylow - UG-based food delivery platform",
     description: "We deliver meals from your favourite restaurants on campus right to your doorstep, for free!",
};


export const viewport = {
     maximumScale: 1,
     userScalable: false
}



const OtherLayout = ({
     children,
     // modal,
}: {
     children: React.ReactNode;
     // modal: React.ReactNode
}) => {
     return (
         <GoogleOAuthProvider clientId={process.env.AUTH_GOOGLE_ID!}>
          <html lang='en' className={nunitoSans.className}>
               <body>
                    {children}
                    {/*{modal}*/}

                    <LoadingOverlay />
                    <ClientLayoutShell children={undefined} />
                    <BetaToastTrigger />
                    <Toaster />
               </body>
          </html>
         </GoogleOAuthProvider>
     )
}

export default OtherLayout