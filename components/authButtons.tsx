'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { FaSignOutAlt } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import useUserStore from '@/stores/useUserStore'
import { storeTokens, clearTokens } from '@/lib/auth'
import axiosInstance from '@/lib/interceptors/axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'


const API_URL = process.env.NEXT_PUBLIC_API_URL

const GoogleSignInButton = () => {
    const CLIENT_ID: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
    const router = useRouter()
    const setAuthenticated = useUserStore(state => state.setAuthenticated)
    const [loading, setLoading] = useState(false)




    return (
        // <button
        //     onClick={login}
        //     className='w-full h-11 border border-gray-300 rounded-full flex items-center justify-center space-x-2'
        //     type='submit'
        //     disabled={loading}
        // >
        //     {loading ? (
        //         <>
        //             <span className="loading loading-spinner loading-sm fill-primary-main" />
        //             <span className="text-sm text-secondary-soft font-medium">Signing you in...</span>
        //         </>
        //     ) : (
        //         <>
        //             <FcGoogle className='size-5' />
        //             <span className='text-sm font-medium'>Continue with Google</span>
        //         </>
        //     )
        //     }
        // </button>
        <div className='mx-auto w-full'>
            <GoogleLogin
                onSuccess={async credentialResponse => {
                    const idToken = credentialResponse.credential

                    try {
                        const response = await axiosInstance.post(`${API_URL}/api/auth/google`, { idToken })

                        setAuthenticated(true)
                        storeTokens(response.data.accessToken, response.data.refreshToken)
                        router.push('/')
                    } catch(error) {
                        toast.error('Sign in failed. Please try again')
                        console.error(error)
                    } finally {
                        setLoading(false)
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                logo_alignment='center'
                text='continue_with'
                shape='pill'
                useOneTap={false}
                // ux_mode={/}
            />
        </div>
    )
}



const EmailSignUpForm = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleSignUp = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()

        try {
            const response = await axiosInstance.post(`${API_URL}/api/auth/signup`, { username, email, password })

            if(response.status === 200) {
                toast('Check your email to verify')
                setTimeout(() => {
                    router.push('/auth/sign-in')
                }, 6000)
            } else {
                toast('Something happened. Please try again')
            }
        } catch (error) {
            console.log(error)
            toast.error('Error signing up. Please try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='flex flex-col space-y-5 mt-1'>
            <div>
                <Label htmlFor='username' className='font-medium'>
                        Username
                    </Label>
                    <Input
                        id='username'
                        type='username'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter your email...'
                        className='mt-1 w-full px-4 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/50'
                        autoComplete='email'
                        required
                    />
            </div>
            <div>
                <Label htmlFor='email' className='font-medium'>
                    Email
                </Label>
                <Input
                    id='email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email...'
                    className='mt-1 w-full px-4 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/50'
                    autoComplete='email'
                    required
                />
            </div>

            <div className='relative'>
                <Label htmlFor='password' className='font-medium'>
                    Password
                </Label>
                <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your paassword...'
                    className='mt-1 w-full px-4 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/50'
                    autoComplete='email'
                    required
                />
                <button
                    type='button'
                    className='absolute right-3 top-5.5 p-1 text-gray-500 hover:text-gray-700'
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className='h-5 w-5' />
                    ) : (
                        <Eye className='h-5 w-5' />
                    )}
                </button>
            </div>

            <div className='space-y-2.5'>
                <button
                    className='w-full h-11 bg-primary-light text-white rounded-full font-semibold'
                    type='submit'
                    disabled={loading}
                    onClick={handleSignUp}
                >
                    {loading ? (
                        <div className='flex items-center justify-center text-white'>
                            <span className='loading loading-spinner loading-sm' />
                            <span className='text-sm text-secondary-soft font-medium'>Wait...</span>
                        </div>
                    ) : (
                        <>
                            Next
                        </>
                    )}
                </button>

                <p className='text-sm text-gray-500'>
                    Already have an account? <Link href='/auth/sign-in' className='text-primary-main font-medium'>Sign in</Link>
                </p>
            </div>
        </form>
    )
}


const signInSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
})

type SignInFormData = z.infer<typeof signInSchema>


const EmailSignInForm = () => {
    const setAuthenticated = useUserStore(state => state.setAuthenticated)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)


    // useEffect(() => {
    //     // Don't store the current route if it's the sign-in page itself
    //     if (window.location.pathname !== '/auth/sign-in') {
    //         sessionStorage.setItem('previousRoute', window.location.pathname)
    //     }
    // }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    })


    const onSubmit = async (data: SignInFormData) => {
        setLoading(true)
        setError(null)

        try {
            const response = await axiosInstance.post(`${API_URL}/api/auth/login`, data)
            const accessToken: string = response.data.accessToken
            storeTokens(accessToken, response.data.refreshToken)

            const showBetaToast = 'true'

            if (response.status >= 200 && accessToken) {
                setAuthenticated(true)
                toast.success('Login successful')
                localStorage.setItem('showBetaToast', showBetaToast)
                router.push('/')

                // setTimeout(() => {
                //     toast.info(
                //         <div className='flex flex-col space-y-1'>
                //             <span className='font-medium'>🚀 Welcome to MerryLow Beta</span>
                //             <span className="text-sm">
                //               You're using an early version of our new platform.
                //               <Link href='/profile/contact-us' className='text-primary-main ml-1'>
                //                 Report any bugs or issues
                //               </Link>
                //             </span>
                //         </div>,
                //         {
                //             duration: 10000,
                //             position: 'top-center'
                //         }
                //     )
                // }, 3000)

                // // Get the previous route from session storage or default to '/'
                // const previousRoute = sessionStorage.getItem('previousRoute') || '/'
                //
                // // List of protected routes that require authentication
                // const protectedRoutes = [
                //     '/restaurants/[restaurantId]', // [id]
                //     '/checkout',
                //     '/cart'
                // ]
                //
                // // checks if the previous route is a protected route or if it's the sign-in page itself
                // const isFromProtectedRoute = protectedRoutes.some(route => previousRoute.includes(route))
                //
                // if (isFromProtectedRoute || previousRoute !== '/auth/sign-in') {
                //     // If coming from a protected route or not from sign-in page directly
                //     router.back()
                // } else {
                //     // If came directly to sign-in page or from non-protected route
                //     router.push('/')
                // }
                //
                // // Clear the stored previous route
                // sessionStorage.removeItem('previousRoute')
            } else {
                setError('An error occurred while signing you in')
                toast.error('An error occurred while signing you in')
            }
        } catch (err: any) {
            if (err.response?.data?.message === 'Invalid User Credentials!') {
                setError('Invalid email or password')
                // toast.error('Invalid email or password')
            } else {
                setError('An error occurred. Please try again')
                // toast.error('An error occurred. Please try again')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5 mt-1'>
            {error && (
                <div className='text-base mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
                    {error}
                </div>
            )}

            <div>
                <Label htmlFor='email' className='font-medium'>
                    Email
                </Label>
                <Input
                    id='email'
                    type='email'
                    {...register('email')}
                    placeholder='Enter your email...'
                    className={`mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:outline-none focus:ring-1 ${
                        errors.email
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-secondary-soft focus:ring-primary-main/50'
                    }`}
                    autoComplete='email'
                />
                {errors.email && (
                    <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
                )}
            </div>

            <div className='relative'>
                <Label htmlFor='password' className='font-medium'>
                    Password
                </Label>
                <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    placeholder='Enter your password...'
                    className={`mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:outline-none focus:ring-1 ${
                        errors.password
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-secondary-soft focus:ring-primary-main/50'
                    }`}
                    autoComplete='current-password'
                />
                <button
                    type='button'
                    className='absolute right-3 top-6 p-1 text-gray-500 hover:text-gray-700'
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className='h-5 w-5' />
                    ) : (
                        <Eye className='h-5 w-5' />
                    )}
                </button>
                {errors.password && (
                    <p className='mt-1 text-sm text-red-600'>{errors.password.message}</p>
                )}
            </div>

            <div className='space-y-2.5'>
                <button
                    className='w-full h-11 bg-primary-light text-white rounded-full font-semibold hover:bg-primary-main transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    type='submit'
                    disabled={loading}
                >
                    {loading ? (
                        <div className='flex items-center justify-center space-x-1.5 text-white'>
                            <span className='loading loading-spinner loading-sm' />
                            <span className='text-sm font-medium'>Signing in...</span>
                        </div>
                    ) : (
                        'Sign In'
                    )}
                </button>

                <div className='flex justify-between'>
                   <span className='text-sm text-gray-500'>
                       Don't have an account?{' '}
                       <Link href='/auth/sign-up' className='text-primary-main font-medium'>
                            Sign up
                       </Link>
                   </span>

                    <span className='text-sm text-gray-500'>
                        <Link href='/auth/forgot-password' className='text-primary-main font-medium'>
                          Forgot password?
                        </Link>
                    </span>
                </div>
            </div>
        </form>
    )
}



const SignOutButton = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSignOut = async () => {
        setLoading(true)

        try {
            const response = await axiosInstance.post(`${API_URL}/api/auth/logout`,
                {},
                { withCredentials: true }
            )
            console.log(response)

            localStorage.removeItem('cart')
            clearTokens()
            googleLogout()

            setTimeout(() => {
                router.push('/auth/sign-in')
            }, 100)
        } catch (error) {
            clearTokens()
            googleLogout()
            router.push('/auth/sign-in')
            // toast.error('Failed to log you out. Please try again')
        } finally {
             setLoading(false)
        }
    }

    return (
        <button
            className='w-full h-11 flex items-center justify-center space-x-2.5 btn'
            disabled={loading}
            type='submit'
            onClick={handleSignOut}
        >
            {loading ? (
                <div className='flex items-center justify-center text-white space-x-1.5'>
                    <span className="loading loading-spinner loading-sm" />
                    <span className="text-sm font-medium">Logging you out...</span>
                </div>
            ) : (
                <>
                    <FaSignOutAlt />
                    <span>Log out</span>
                </>
            )
            }
        </button>
    )
}


export { GoogleSignInButton, EmailSignUpForm, EmailSignInForm, SignOutButton }