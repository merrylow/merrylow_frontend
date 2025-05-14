import { EmailSignInForm, GoogleSignInButton } from '@/components/authButtons'
import Link from "next/link"
import { GoogleOAuthProvider } from '@react-oauth/google'
// import { auth } from '@/lib/auth';
// import { redirect } from 'next/navigation';

const SignInPage = async () => {
    // const session = await auth()


    return (
        <div className='min-h-screen flex flex-col items-center space-y-2.5'>
            {/* Top Section */}
            <section
                className='relative h-[30vh] w-full bg-no-repeat bg-cover bg-center rounded-b-3xl flex flex-col justify-end pb-13 text-white'
                style={{ backgroundImage: `linear-gradient( rgba(19, 19, 38, 0.40), rgba(19, 19, 38, 0.85) ), url('/360_F_351024684_qRJBZa0XlvKs5bKDHVqlcbVF2ux4tDga.jpg')` }}
            >
                <div className='w-[88%] mx-auto'>
                    <h1 className='text-3xl font-bold  mb-2'>Welcome</h1>
                    <p className='text-sm'>
                        Enter your email to sign in to your account
                    </p>
                </div>
            </section>

            {/* Bottom Section */}
            <section className='h-[45vh] w-[88%] max-w-md flex flex-col justify-evenly'>
                <EmailSignInForm />

                <div className='flex items-center justify-center text-sm text-gray-400'>
                    <span className="px-2">or Sign in with Google</span>
                </div>

                <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                    <GoogleSignInButton />
                </GoogleOAuthProvider>
            </section>
        </div>
    )
}

export default SignInPage;