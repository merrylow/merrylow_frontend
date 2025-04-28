import NextAuth from "next-auth"
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google
    ],
    pages: {
        signIn: '/sign-in',
        verifyRequest: '/auth/very-request'
    },
})