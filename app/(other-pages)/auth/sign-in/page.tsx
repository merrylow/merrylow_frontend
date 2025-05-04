import {EmailSignInButton, GoogleSignInButton} from "@/components/authButtons";
import Link from "next/link";
import BottomNav from "@/components/bottomNav";
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const SignInPage = async () => {
    const session = await auth()

    if (session) redirect('/')

    return (
        <div className='min-h-screen flex flex-col items-center space-y-2.5'>
            {/* Top Section */}
            <section
                className='relative h-[30vh] w-full bg-no-repeat bg-cover bg-center rounded-b-3xl flex flex-col justify-end pb-13 text-white'
                style={{ backgroundImage: `linear-gradient( rgba(19, 19, 38, 0.40), rgba(19, 19, 38, 0.85) ), url('/360_F_351024684_qRJBZa0XlvKs5bKDHVqlcbVF2ux4tDga.jpg')` }}
            >
                <div className='w-[88%] mx-auto'>
                    <h1 className='text-3xl font-bold  mb-2'>Welcome back</h1>
                    <p className='text-sm'>
                        Enter your email to sign in to your account
                    </p>
                </div>
            </section>

            {/* Bottom Section */}
            <section className='h-[45vh] w-[88%] max-w-md flex flex-col justify-evenly'>
                <form className='flex flex-col space-y-5'>
                    <label htmlFor='email' className='font-medium'>
                        Email
                        <input
                            id='email'
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            className='mt-1 w-full px-4 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:border-none focus:ring-1 focus:ring-primary-light'
                            autoComplete='email'
                            required
                        />
                    </label>

                    <div className='space-y-2'>
                        <EmailSignInButton />
                        <p className='text-sm text-gray-500'>
                            Don't have an account? <Link href='/auth/sign-up' className='text-primary-main font-medium'>Sign up</Link>
                        </p>
                    </div>
                </form>


                <div className='flex items-center justify-center text-sm text-gray-400'>
                    <span className="px-2">or Sign in with Google</span>
                </div>

                <GoogleSignInButton />
            </section>
        </div>
    )
}

export default SignInPage;