import Link from 'next/link'
import { GoogleSignInButton, EmailSignUpForm } from '@/components/authButtons'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const SignUpPage = () => {
    // add redirect



    return (
        <div className='min-h-screen h-screen flex flex-col items-center space
        -y-2.5'>
            {/* Top Section */}
            <section
                className='relative h-[30vh] w-full bg-no-repeat bg-cover bg-center rounded-b-3xl flex flex-col justify-end pb-13 text-white'
                style={{ backgroundImage: `linear-gradient( rgba(19, 19, 38, 0.40), rgba(19, 19, 38, 0.85) ), url('/360_F_351024684_qRJBZa0XlvKs5bKDHVqlcbVF2ux4tDga.jpg')` }}>
                <div className='w-[88%] mx-auto'>
                    <h1 className='text-3xl font-bold  mb-2'>Welcome</h1>
                    <p className='text-sm'>
                        Enter your email to sign up on MERRYLOW
                    </p>
                </div>
            </section>

            {/* Bottom Section */}
            <section className='h-[50vh] w-[88%] max-w-md flex flex-col justify-evenly'>
                <EmailSignUpForm />

                <div className='flex items-center justify-center text-sm text-gray-400'>
                    <span className="px-2">or Sign up with Google</span>
                </div>

                {/*when user signs in with this for the first time, their details are automatically recorded
                 in db*/}
                {/*<GoogleSignInButton />*/}
            </section>
        </div>
    )
}

export default SignUpPage