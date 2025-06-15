'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

const BetaToastTrigger = () =>{
    const pathname = usePathname()

    useEffect(() => {
        const timer = setTimeout(() => {
            const showBetaToast = localStorage.getItem('showBetaToast')

            if (showBetaToast === 'true') {
                toast.info(
                    <div className='flex flex-col space-y-1'>
                        <span className='font-medium'>Welcome to MerryLow Beta 🚀</span>
                        <span className='text-sm'>

                            You're using an early version of our platform.
                            <Link href='/profile/contact-us' className='text-primary-main ml-1'>
                                Report any issues
                            </Link>
                        </span>
                    </div>,
                    {
                        duration: 9000,
                        // important: true // ts warning
                    }
                )

                localStorage.removeItem('showBetaToast')
            }
        }, 1000) // small delay to ensure everything is loaded

        return () => clearTimeout(timer)
    }, [pathname])

    return null
}

export default BetaToastTrigger