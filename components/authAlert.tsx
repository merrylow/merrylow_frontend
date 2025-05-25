'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const AuthAlert = ({ onClose }: {
    onClose: () => void
}) => {
    const router = useRouter()

    return (
        <div className='absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg p-6 w-[80%] mx-auto relative'>
                <button
                    onClick={onClose}
                    className='absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100'
                    aria-label='Close'
                >
                    <X className='h-5 w-5 text-gray-500' />
                </button>

                <h3 className='text-lg font-semibold mb-2'>Sign In Required</h3>
                <p className='text-gray-600 mb-6'>
                    You need to sign in to add items to your cart.
                </p>

                <div className='flex gap-4'>
                    <Button
                        onClick={() => router.push('/auth/sign-in')}
                        className='flex-1 bg-primary-main hover:bg-primary-main/90 text-white'
                    >
                        Sign In
                    </Button>
                    <Button
                        onClick={() => router.push('/auth/sign-up')}
                        variant='outline'
                        className='flex-1 border-primary-main text-primary-main hover:bg-primary-main/10'
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AuthAlert