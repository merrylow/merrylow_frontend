import NextAuth from "next-auth"
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import { prisma } from './prisma'

// const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    // adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        // Nodemailer({
        //     server: process.env.EMAIL_SERVER,
        //     from: process.env.EMAIL_FROM,
        // })
    ],
    pages: {
        signIn: '/auth/sign-in',
        verifyRequest: '/auth/verify-request'
    },
    // callbacks: {
    //     async signIn({ user }) {cd backend
    //         // tells backend to sync user data
    //         await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sync-user`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ email: user.email }),
    //         })
    //
    //         return true
    //     },
    // },
})

