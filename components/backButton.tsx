'use client'

import { usePathname, useRouter } from 'next/navigation'
import { FaChevronLeft } from 'react-icons/fa'
import clsx from 'clsx'

const BackButton = () => {
    const router = useRouter()
    const pathname = usePathname()

    const handleNavigation = () => {
        switch(pathname) {
            case '/cart':
                router.push('/restaurants') // goes to dynamic restaurant storefront
                break;
            case '/checkout':
                router.push(`/restaurants`) // redirect to dynamic storefront
                break
            case '/profile/my-orders':
                router.push('/cart')
                break
            case '/auth/sign-in':
            case '/auth/sign-up':
                router.back()
                break;
            default:
                router.back()
        }
    }

    const buttonClass = clsx(
        'w-8 h-8 flex items-center justify-center rounded-full bg-transparent z-50 cursor-pointer',
        {
            '-ml-1 text-primary-main/80': pathname === '/checkout',
            '-ml-1 text-primary-main/80 gap-3': pathname === '/cart',
            '-ml-1 text-white': pathname === '/auth/sign-in',
            '-ml-1 text-white/90 gap-1.5': pathname === '/auth/sign-up',
            '-ml-1 text-primary-main/90': pathname === '/see-all/top-restaurants',
            '-ml-1 text-primary-main/90 gap-1': pathname === '/see-all/what-others-are-ordering',
            '-ml-1.5 text-primary-main/90': pathname === '/profile/privacy-policy',
            '-ml-1 text-primary-main': pathname === '/profile/terms-of-service',
            '-ml-1.5 text-primary-main/80': pathname === '/profile/help-faq',
            '-ml-1.5 text-primary-main/90 gap-2': pathname === '/profile/my-orders',
        }
    )

    return (
        <button
            onClick={handleNavigation}
            className={buttonClass}
            type='button'
            aria-label='back button'
        >
            <FaChevronLeft className='size-5 fill-primary-main/60' />
        </button>
    )
}

export default BackButton