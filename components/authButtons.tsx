'use client'

import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { signIn, signOut } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { FaSignOutAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation';

const GoogleSignInButton = () => {
    const [loading, setLoading] = useState(false)

     const handleSignIn = async () => {
        setLoading(true)

         try {
             await signIn('google')
         } catch (error) {
             toast.error('Sign in failed. Try again')
             console.error('Sign in failed', error)
             setLoading(false)
         }
     }

    return (
        <button
            onClick={handleSignIn}
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
    )
}




const EmailSignInButton = () => {
    const [loading, setLoading] = useState(false)

    const handleSignIn = async () => {
        setLoading(true)

        try {
            await signIn()
        } catch (error) {
            toast.error('Sign in failed. Try again')
            console.error('Sign in failed', error)
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleSignIn}
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
        <button
            onClick={handleSignOut}
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
    )
}


export { GoogleSignInButton, EmailSignInButton, SignOutButton }