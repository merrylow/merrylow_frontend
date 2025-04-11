import React from 'react'
import type { Metadata } from "next";
import { Rubik, Inter,  } from "next/font/google";
import "../globals.css";



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




const RestaurantLayout = ({
     children,
     productModal,
}: {
     children: React.ReactNode;
     productModal: React.ReactNode
}) => {
     return (
          <html lang='en' className={inter.className}>
               <body>
                    {children}
                    {productModal}
               </body>
          </html>
     )
}

export default RestaurantLayout