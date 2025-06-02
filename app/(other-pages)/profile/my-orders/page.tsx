'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import LoadingSpinner from '@/components/loadingSpinner'
import BackButton from '@/components/backButton'
import BottomNav from '@/components/bottomNav'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utilFunctions'
import useOrderStore from '@/stores/useOrderStore'
import useCartStore from '@/stores/useCartStore'
import axiosInstance from '@/lib/interceptors/axios'

const MyOrdersContent = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const orders = useOrderStore(state => state.orders)
    const fetchOrders = useOrderStore(state => state.fetchOrders)
    const clearCart = useCartStore(state => state.clearCart)

    useEffect(() => {
        fetchOrders()
    }, [])

    useEffect(() => {
        const loadOrders = async () => {
            await fetchOrders()
        }
        loadOrders()
    }, [fetchOrders])

    // useEffect(() => {
    //     // const paymentSuccess = searchParams.get('payment_success')
    //     const transactionRef = searchParams.get('trxref')
    //     const reference = searchParams.get('reference')
    //
    //     // if (paymentSuccess === 'true') {
    //     if (transactionRef && reference) {
    //         toast.success('Payment successful! Your order has been placed.', {
    //             description: 'You will receive a confirmation email shortly.',
    //             duration: 5000
    //         })
    //         console.log('toast!!')
    //         // cleans the url to prevent toast from showing again on refresh
    //         // const cleanUrl = window.location.pathname
    //         // window.history.replaceState(null, '', cleanUrl)
    //     }
    // }, [searchParams])

    useEffect(() => {
        const verifyPayment = async (reference: string) => {
            try {
                const response = await axiosInstance.get(
                    `https://api.paystack.co/transaction/verify/${reference}`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`
                        }
                    }
                )

                const { data } = response.data

                if (data.status === 'success') {
                    toast.success('Payment successful! Your order has been placed.', {
                        description: 'You will receive a confirmation email shortly.',
                        duration: 5000
                    })

                    // Clear the cart after successful payment
                    // You might want to call a clearCart action if you have one

                    // Clean the URL to prevent toast from showing again on refresh
                    window.history.replaceState(null, '', window.location.pathname)
                } else {
                    toast.error('Payment verification failed', {
                        description: 'Please check your order status or contact support.',
                        duration: 5000
                    })
                }
            } catch (error) {
                console.error('Error verifying payment:', error)
                toast.error('Payment verification error', {
                    description: 'Unable to verify payment status. Please check your orders later.',
                    duration: 5000
                })
            }
        }

        const reference = searchParams.get('reference')
        const trxref = searchParams.get('trxref')

        if (reference) {
            verifyPayment(reference).then((r) => console.log(r))
        } else if (trxref) {
            // Some Paystack implementations use trxref instead of reference
            verifyPayment(trxref).then((r) => console.log(r))
        }


        setTimeout(() => {
            router.push('/')
        }, 7000)
    }, [searchParams])

    return (
        <main className='w-full h-full flex flex-col items-center justify-center overflow-x-hidden pb-10'> {/* -items-center justify-center */}
            <section className='flex justify-center items-center w-[90%] mx-auto mt-4'>
                <h1 className='text-lg text-secondary-light font-bold'>My Orders</h1>
            </section>

            <section className='fixed flex justify-start items-center w-[90%] sm:max-w-[410px] h-10 top-3 left-1/2 -translate-x-1/2 mx-auto z-50'>
                <BackButton />
            </section>

            <section className='w-[90%] flex flex-col items-start justify-between gap-2 mt-5 mx-auto z-0'>
                {/*{*/}
                {/*    Array(6).fill(null).map((item, i) => (*/}
                {/*        <div key={i} className='w-full flex justify-between items-start space-y-2 bg-white mb-3'> /!* border-b border-gray-100 *!/*/}
                {/*            <div*/}
                {/*                className='flex gap-3'>*/}
                {/*                <div*/}
                {/*                    className='relative flex-shrink-0 w-20 h-19 rounded-xl overflow-hidden'>*/}
                {/*                    <Image*/}
                {/*                        src='/jollof-rice-marg-tee-1094739000-612x612.jpg'*/}
                {/*                        alt=''*/}
                {/*                        width={85}*/}
                {/*                        height={80}*/}
                {/*                        className='object-cover w-full h-full -z-50'*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*                <div className='-space-y-0.5 mt-0.5 pr-2.5'>*/}
                {/*                    <h2 className='leading-none text-base font-semibold text-black-soft'>*/}
                {/*                        /!*{cartItem?.menu?.name}*!/*/}

                {/*                    </h2>*/}
                {/*                    <div className='grid grid-cols-2 gap-x-2 mt-1'>*/}

                {/*                    </div>*/}

                {/*                    <span*/}
                {/*                        className='text-primary-main font-bold text-[1rem] block mt-1'>*/}
                {/*                                      /!*₵{formatCurrency(String(calculateItemTotal(cartItem)))}*!/*/}
                {/*                        ₵60.00*/}
                {/*                    </span>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*            <div className='mt-1 h-full flex-shrink-0'>*/}
                {/*                <p className='bg-gray-pale text-secondary-light text-xs pt-1 pb-0.5 px-2 rounded-2xl'>Processing</p>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    ))*/}
                {/*}*/}

                <section className='w-[90%] flex items-center justify-center mx-auto'>
                    <p className='font-medium text-base text-left'>Your order has been placed successfully! Please check your mail for confirmation. Check your spam if you're not seeing anything</p>
                </section>
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
        <Suspense fallback={
            <main className='flex flex-col justify-center items-center'>
                <LoadingSpinner />
            </main>
        }
        >
            <MyOrdersContent />
        </Suspense>
    )
}

export default MyOrdersPage