'use client'

import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { signIn, signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { FaSignOutAlt } from 'react-icons/fa'
// import SessionWrapper from '@/components/client/sessionWrapper';


const GoogleSignInButton = () => {
    const [loading, setLoading] = useState(false)
    // const { data: session } = useSession()

     const handleSignIn = async () => {
        setLoading(true)

         try {
             await signIn('google')
             // if (!session?.user) return null
             toast.success(`Welcome`)
         } catch (error) {
             toast.error('Sign in failed. Try again')
             console.error('Sign in failed', error)
             setLoading(false)
         }
     }

    return (
        // <SessionWrapper>
            <button
                onClick={() => handleSignIn()}
                className='w-full h-11 border border-gray-300 rounded-full flex items-center justify-center space-x-2'
                type='submit'
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="loading loading-spinner loading-sm text-primary-main" />
                        <span className="text-sm text-secondary-soft font-medium">Signing you in...</span>
                    </>
                ) : (
                    <>
                        <FcGoogle className='size-5' />
                        <span className='text-sm font-medium'>Continue with Google</span>
                    </>
                )
                }
            </button>
        // </SessionWrapper>
    )
}




const EmailSignInButton = () => {
    const [loading, setLoading] = useState(false)
    // const { data: session } = useSession()

    const handleSignOut = async () => {
        setLoading(true)

        try {
            await signOut()
            // if (!session?.user) return null
            // toast.success(`Welcome ${session?.user?.name}`)
        } catch (error) {
            toast.error('Sign in failed. Try again')
            console.error('Sign in failed', error)
            setLoading(false)
        }
    }

    return (
        // <SessionWrapper>
            <button
                onClick={() => handleSignOut}
                className='w-full h-11 bg-primary-light text-white rounded-full font-semibold'
                type='submit'
            >
                {loading ? (
                    <>
                        <span className="loading loading-spinner loading-sm text-primary-main" />
                        <span className="text-sm text-secondary-soft font-medium">Signing you in...</span>
                    </>
                ) : (
                    <>
                        Next
                    </>
                )}
            </button>
        // </SessionWrapper>
    )
}




const SignOutButton = () => {
    const [loading, setLoading] = useState(false)

    const handleSignOut = async () => {
        setLoading(true)

        try {
            await signOut()
        } catch (error) {
            toast.error('Sign out failed. Try again')
            console.error('Sign out failed', error)
            setLoading(false)
        }
    }

    return (
        // <SessionWrapper>
            <button
                onClick={() => handleSignOut}
                className='w-full h-11 flex items-center justify-center space-x-2.5 btn'
                disabled={loading}
                type='submit'
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
        // </SessionWrapper>
    )
}


export { GoogleSignInButton, EmailSignInButton, SignOutButton }