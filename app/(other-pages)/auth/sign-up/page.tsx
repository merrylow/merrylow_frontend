import {FcGoogle} from "react-icons/fc";
import Link from "next/link";
import BottomNav from "@/components/bottomNav";

const SignUpPage = () => {
    return (
        <div className='min-h-screen flex flex-col items-center bg-white'>
            {/* Top Section */}
            <section
                className='relative h-[30vh] w-full bg-no-repeat bg-cover bg-center rounded-b-3xl flex flex-col justify-end pb-13 text-white'
                style={{ backgroundImage: `linear-gradient( rgba(19, 19, 38, 0.65), rgba(19, 19, 38, 0.95) ), url('/360_F_351024684_qRJBZa0XlvKs5bKDHVqlcbVF2ux4tDga.jpg')` }}>
                <div className='w-[88%] mx-auto'>
                    <h1 className='text-3xl font-bold  mb-2'>Welcome</h1>
                    <p className='text-sm'>
                        Enter your email to sign up on Merrylow
                    </p>
                </div>
            </section>

            {/* Bottom Section */}
            <section className='h-[50vh] w-[88%] max-w-md mt-1.5S flex flex-col justify-evenly'>
                <div className='space-y-5'>
                    <form>
                        <label htmlFor='email' className='font-medium'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            className='mt-1 w-full px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light'
                            autoComplete='email'
                        />
                    </form>

                    <button className='w-full h-11 mb-7 bg-primary-light text-white rounded-full font-semibold'>
                        Next
                    </button>

                    <div className='flex items-center justify-center text-sm text-gray-400'>
                        <span className="px-2">or Sign up with Email</span>
                    </div>

                    <button className='w-full h-11 border border-gray-300 rounded-full flex items-center justify-center space-x-2'>
                        <FcGoogle className='size-5' />
                        <span className='text-sm font-medium'>Continue with Google</span>
                    </button>
                </div>

                <p className='text-sm text-gray-500'>
                    Already have an account? <Link href='/profile' className='text-primary-main font-medium'>Sign up</Link>
                </p>
            </section>

            <div>
                <BottomNav />
            </div>
        </div>
    )
}


export default SignUpPage