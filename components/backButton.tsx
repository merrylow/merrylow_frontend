'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import { FaChevronLeft } from 'react-icons/fa'
import clsx from 'clsx'

const BackButton = () => {
    const router = useRouter()
    const pathname = usePathname()

    const handleNavigation = () => {
        if (pathname === '/cart') {
            router.back() // dynamic restaurant storefront
        } else if (pathname === '/checkout') {
            router.push('/cart')
        } else if (pathname === '/auth/sign-in') {
            router.back()
        }
    }

    return (
        // <Link
        //     href={href}
        //     className={clsx('w-8 h-8 flex items-center justify-center rounded-full bg-transparent z-50 cursor-pointer', {'-ml-1 text-primary-main/80': pathname === '/checkout', '-ml-2 text-primary-main/80': pathname === '/cart'})}
        //     type='button'
        //     aria-label='back button'
        // >
        //     <FaChevronLeft className='size-5 fill-primary-main/60' />
        // </Link>

        <button
            onClick={handleNavigation}
            className={clsx('w-8 h-8 flex items-center justify-center rounded-full bg-transparent z-50 cursor-pointer', {'-ml-1 text-primary-main/80': pathname === '/checkout', '-ml-2 text-primary-main/80': pathname === '/cart'})}
            type='button'
            aria-label='back button'
        >
            <FaChevronLeft className='size-5 fill-primary-main/60' />
        </button>
    )
}

export default BackButton