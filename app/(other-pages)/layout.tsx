import React from 'react'
import type { Metadata } from "next";
import { Rubik, Inter, Nunito_Sans } from "next/font/google";
import "../globals.css";
import { Toaster } from 'react-hot-toast'



const rubik = Rubik({
     subsets: ['latin'],
     display: 'swap'
});

const inter = Inter({
     subsets: ['latin'],
     display: 'swap',
})

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
     modal,
}: {
     children: React.ReactNode;
     modal: React.ReactNode
}) => {
     return (
          <html lang='en' className={nunitoSans.className}>
               <body>
                    {children}
                    {modal}
                    <Toaster />
               </body>
          </html>
     )
}

export default OtherLayout