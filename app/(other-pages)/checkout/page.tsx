'use client'

import dynamic from 'next/dynamic'
import LoadingSpinner from '@/components/loadingSpinner'

const CheckoutComponent = dynamic(
    () => import('@/components/checkoutComponent'),
    {
        ssr: false,
        loading: () => (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        )
    }
)

const CheckoutPage = () => {
    return (
        <CheckoutComponent />
    )
}

export default CheckoutPage