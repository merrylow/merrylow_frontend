'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import LoadingSpinner from '@/components/loadingSpinner'
import { ClearCartButton } from '@/components/cart/cartButtons'
import BackButton from '@/components/backButton'
import BottomNav from '@/components/bottomNav'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utilFunctions'
import useOrderStore from '@/stores/useOrderStore'

const MyOrdersContent = () => {
    const searchParams = useSearchParams()
    const orders = useOrderStore(state => state.orders)
    const fetchOrders = useOrderStore(state => state.fetchOrders)

    useEffect(() => {
        fetchOrders().then(r => console.log('Order fetched: file:my-orders/page', r))
    }, [])

    useEffect(() => {
        // const paymentSuccess = searchParams.get('payment_success')
        const transactionRef = searchParams.get('trxref')
        const reference = searchParams.get('reference')

        // if (paymentSuccess === 'true') {
        if (transactionRef && reference) {
            toast.success('Payment successful! Your order has been placed.', {
                description: 'You will receive a confirmation email shortly.',
                duration: 5000
            })
            console.log('toast!!')
            // cleans the url to prevent toast from showing again on refresh
            // const cleanUrl = window.location.pathname
            // window.history.replaceState(null, '', cleanUrl)
        }
    }, [searchParams])

    return (
        <main className='w-full h-full flex flex-col overflow-x-hidden pb-10'>
            <section className='flex justify-center items-center w-[90%] mx-auto mt-4'>
                <h1 className='text-lg text-secondary-light font-bold'>My Orders</h1>
            </section>

            <section className='fixed flex justify-start items-center w-[90%] sm:max-w-[410px] h-10 top-3 left-1/2 -translate-x-1/2 mx-auto z-50'>
                <BackButton />
            </section>

            <section className='w-[90%] flex flex-col items-start justify-between gap-2 mt-5 mx-auto z-0'>
                {
                    Array(6).fill(null).map((item, i) => (
                        <div key={i} className='w-full flex justify-between items-start space-y-2 bg-white mb-3'> {/* border-b border-gray-100 */}
                            <div
                                className='flex gap-3'>
                                <div
                                    className='relative flex-shrink-0 w-20 h-19 rounded-xl overflow-hidden'>
                                    <Image
                                        src='/jollof-rice-marg-tee-1094739000-612x612.jpg'
                                        alt=''
                                        width={85}
                                        height={80}
                                        className='object-cover w-full h-full -z-50'
                                    />
                                </div>
                                <div className='-space-y-0.5 mt-0.5 pr-2.5'>
                                    <h2 className='leading-none text-base font-semibold text-black-soft'>
                                        {/*{cartItem?.menu?.name}*/}

                                    </h2>
                                    <div className='grid grid-cols-2 gap-x-2 mt-1'>

                                    </div>

                                    <span
                                        className='text-primary-main font-bold text-[1rem] block mt-1'>
                                                      {/*₵{formatCurrency(String(calculateItemTotal(cartItem)))}*/}
                                        ₵60.00
                                    </span>
                                </div>
                            </div>

                            <div className='mt-1 h-full flex-shrink-0'>
                                <p className='bg-gray-pale text-secondary-light text-xs pt-1 pb-0.5 px-2 rounded-2xl'>Processing</p>
                            </div>
                        </div>
                    ))
                }
            </section>

            <section className='mt-14' />


            <section>
                <BottomNav />
            </section>
        </main>
    )
}


const MyOrdersPage = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <MyOrdersContent />
        </Suspense>
    )
}

export default MyOrdersPage