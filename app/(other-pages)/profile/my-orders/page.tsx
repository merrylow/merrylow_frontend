'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import LoadingSpinner from '@/components/loadingSpinner'

const MyOrdersContent = () => {
    const searchParams = useSearchParams()

    useEffect(() => {
        // const paymentSuccess = searchParams.get('payment_success')
        const transactionRef = searchParams.get('trxref')
        const reference = searchParams.get('refernce')
        console.log(transactionRef)
        console.log(reference)

        // check if an item's status is processing instead
        // if (paymentSuccess === 'true') {
        if (transactionRef && reference) {
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


const MyOrdersPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MyOrdersContent />
        </Suspense>
    )
}

export default MyOrdersPage