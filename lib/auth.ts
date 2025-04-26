import NextAuth from "next-auth"
import Google from 'next-auth/providers/google'
import Nodemailer from 'next-auth/providers/nodemailer'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        // Nodemailer({
        //     server: process.env.EMAIL_SERVER,
        //     from: process.env.EMAIL_FROM,
        // }),
    ],
    pages: {
        signIn: "/profile",
    },
})