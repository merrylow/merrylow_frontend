'use client'

import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
// import { signIn, signOut } from 'next-auth/react'
import { toast } from 'sonner'
import axios from 'axios'
import { FaSignOutAlt } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import { GoogleOAuthProvider, GoogleLogin, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import useUserStore from '@/stores/useUserStore'


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NEXT_PUBLIC_API_URL

const GoogleSignInButton = () => {
    const CLIENT_ID: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
    const router = useRouter()
    // const setUser = useUserStore(state => state.setUser)
    const setAuthenticated = useUserStore(state => state.setAuthenticated)
    const [loading, setLoading] = useState(false)


    // const handleSuccess = async (codeResponse: any) => {
    //     setLoading(true)
    //     if(codeResponse.code) {
    //         toast.success('Signed in successfully')
    //     }
    //     console.log(codeResponse)
    //     const idToken = codeResponse.code
    //
    //     try {
    //         const response = await axios.post(`${API_URL}/api/auth/google`, { idToken })
    //
    //         console.log(response.data.accessToken)
    //         setUser(response.data.data)
    //         setAuthenticated(true)
    //         localStorage.setItem('accessToken', response.data.accessToken)
    //         router.push('/')
    //     } catch(error) {
    //         toast.error('Sign in failed. Please try again')
    //         console.error(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    //
    // const login = useGoogleLogin({
    //     onSuccess: handleSuccess,
    //     // flow: 'auth-code',
    //     redirect_uri: API_URL,
    //     // redirect_uri: BASE_URL,
    //     // ux_mode: 'redirect',
    // });

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
                    // console.log(idToken)

                    try {
                        const response = await axios.post(`${API_URL}/api/auth/google`, { idToken })

                        console.log(response.data)
                        console.log(response.data.accessToken)
                        // setUser(response.data.user)
                        setAuthenticated(true)
                        localStorage.setItem('accessToken', response.data.accessToken)
                        localStorage.setItem('refreshToken', response.data.refreshToken)
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

    const handleSignUp = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()

        try {
            const response = await axios.post(`${API_URL}/api/auth/signup`, { username, email, password })
            console.log(response)
            console.log(response.data)
            toast('Check your email to verify')
            router.push('/auth/sign-in')
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
                <Label htmlFor='email' className='font-medium'>
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

            <div>
                <Label htmlFor='password' className='font-medium'>
                    Password
                </Label>
                <Input
                    id='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your paassword...'
                    className='mt-1 w-full px-4 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/50'
                    autoComplete='email'
                    required
                />
            </div>

            <div className='space-y-2.5'>
                <button
                    className='w-full h-11 bg-primary-light text-white rounded-full font-semibold'
                    type='submit'
                    disabled={loading}
                    onClick={handleSignUp}
                >
                    {loading ? (
                        <>
                            <span className='loading loading-spinner loading-sm text-primary-main' />
                            <span className='text-sm text-secondary-soft font-medium'>Wait...</span>
                        </>
                    ) : (
                        <>
                            Next
                        </>
                    )}
                </button>
                {/*when user signs in with this for the first time, their details are automatically recorded
                         in db*/}
                <p className='text-sm text-gray-500'>
                    Already have an account? <Link href='/auth/sign-in' className='text-primary-main font-medium'>Sign in</Link>
                </p>
            </div>
        </form>
    )
}



const EmailSignInForm = () => {
    const setAuthenticated = useUserStore(state => state.setAuthenticated)
    // const setUser = useUserStore(state => state.setUser)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignIn = async (e: React.FormEvent) => {
        setLoading(true)
        e.preventDefault()
        console.log(email)

        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, { email, password })
            console.log(response)
            const accessToken = response.data.accessToken
            const refreshToken = response.data.refreshToken
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            console.log('hjkl;')
            console.log(accessToken)
            // setUser(response.data.user)
            setAuthenticated(true)
            // const token = document.cookie
            //     .split('; ')
            //     .find(row => row.startsWith('refreshToken='))
            //     ?.split('=')[1];
            //
            // console.log('token:', token);
            // if(token) {
            //     toast('Welcome')
            // console.log('token', token)
            // }

            router.push('/')
            console.log('Welcome')
        } catch (error) {
            console.log(error)
            toast.error('An error occurred. Please try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='flex flex-col space-y-5 mt-1'>
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

            <div>
                <Label htmlFor='password' className='font-medium'>
                    Password
                </Label>
                <Input
                    id='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your paassword...'
                    className='mt-1 w-full px-4 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/50'
                    autoComplete='email'
                    required
                />
            </div>

            <div className='space-y-2.5'>
                <button
                    className='w-full h-11 bg-primary-light text-white rounded-full font-semibold'
                    type='submit'
                    disabled={loading}
                    onClick={handleSignIn}
                >
                    {loading ? (
                        <>
                            <span className='loading loading-spinner loading-sm text-primary-main' />
                            <span className='text-sm text-secondary-soft font-medium'>Wait...</span>
                        </>
                    ) : (
                        <>
                            Next
                        </>
                    )}
                </button>
                {/*when user signs in with this for the first time, their details are automatically recorded
                         in db*/}
                <p className='text-sm text-gray-500'>
                    Don't have an account? <Link href='/auth/sign-up' className='text-primary-main font-medium'>Sign up</Link>
                </p>
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
            await axios.post(`${API_URL}/api/auth/logout`,
                {},
                { withCredentials: true }
            )

            localStorage.removeItem('accessToken')
            router.push('/auth/sign-in')
            googleLogout()
        } catch (error) {
            toast.error('Please try again')
        } finally {
             setLoading(false)
        }
    }

    return (
        <button
            // onClick={}
            className='w-full h-11 flex items-center justify-center space-x-2.5 btn'
            disabled={loading}
            type='submit'
            onClick={handleSignOut}
        >
            {loading ? (
                <>
                    <span className="loading loading-spinner loading-sm text-primary-main" />
                    <span className="text-sm font-medium">Logging you out...</span>
                </>
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