'use client'

// import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import { FaChevronLeft } from 'react-icons/fa'
import clsx from 'clsx'

const BackButton = () => {
    const router = useRouter()
    const pathname = usePathname()
    let backText = ''

    if (pathname === '/checkout') {
        backText = 'Cart'
    } else if (pathname === '/cart') {
        backText = 'Restaurant'
    }

    return (
        <button
            onClick={() => router.back()}
            className={clsx('w-8 h-8 flex items-center justify-center rounded-full bg-transparent z-50 cursor-pointer', {'ml-2 text-primary-light': pathname === '/checkout', 'ml-8 text-primary-light': pathname === '/cart'})}
            type='button'
            aria-label='back button'
        >
            <span>
                <FaChevronLeft className='size-5 icon' />
            </span>
            <span className='text-md pt-0.5'>
                {backText}
            </span>
        </button>
    )
}

export default BackButton