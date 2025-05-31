'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

const MyOrdersPage = () => {
    const searchParams = useSearchParams()

    useEffect(() => {
        const paymentSuccess = searchParams.get('payment_success')

        if (paymentSuccess === 'true') {
            toast.success('Payment successful! Your order has been placed.', {
                description: 'You will receive a confirmation email shortly.',
                duration: 5000
            })

            // cleans the url to prevent toast from showing again on refresh
            const cleanUrl = window.location.pathname
            window.history.replaceState(null, '', cleanUrl)
        }
    }, [searchParams])

    return (
        <h1>My orders page</h1>
    )
}

export default MyOrdersPage