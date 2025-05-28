'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { Product, SelectedAddons } from '@/lib/typeDefs'
import { getAccessToken } from '@/lib/auth'
import { formatCurrency } from '@/lib/utilFunctions'
import useCartStore from '@/stores/useCartStore'
import useUserStore from '@/stores/useUserStore'
import { IoMdClose } from 'react-icons/io'


const API_URL = process.env.NEXT_PUBLIC_API_URL

const AddToOrderButton = ({ product, quantity, selectedAddons, orderNote, onAuthCheck }: { product: Product, quantity: number, selectedAddons: SelectedAddons | null, orderNote: string | null,  onAuthCheck: () => boolean }) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const addToCart = useCartStore(state => state.addToCart)
    const fetchCart = useCartStore(state => state.fetchCart)
    const cart = useCartStore(state => state.cart)
    const cartTotal = useCartStore(state => state.cartTotal)
    const calculateItemTotal = useCartStore(state => state.calculateItemTotal)
    const currentItemTotal = product
        ? calculateItemTotal(product, quantity, selectedAddons)
        : 0

    const fetchUser = useUserStore(state => state.fetchUser)
    // const { user, isAuthenticated, setAuthenticated } = useUserStore()


    // useEffect(() => {
    //     fetchCart()
    // }, [])


    useEffect(() => {
        fetchUser()
    }, [])

    const handleClick = async () => {
        setLoading(true)

        if (!onAuthCheck()) {
            setLoading(false)
            return;
        }

        if (!product) {
            toast.error('Product not loaded')
            return
        }

        try {
            const success = await addToCart(product, quantity, selectedAddons, orderNote)
            console.log(success)

            if(success) {
                router.push('/cart')
            }

        } catch (error) {
            console.error('Add to cart error', error)
            toast.error('Try again')
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleClick}
            className='w-[58%] md:w-[55%] md:max-w-[450px] h-[2.65rem] mx-auto flex items-center justify-center font-bold text-sm btn'
        >
            {
                loading ? (
                    <span className='loading loading-spinner loading-sm'></span>
                ) : (
                    <div className='w-full flex justify-center items-center gap-x-1.5'>
                        <span>Add to order</span>
                        <span>₵{formatCurrency(String(currentItemTotal))}</span>
                    </div>
                )
            }
        </button>
    )
}


const GoToCheckoutButton = () => {
    const cartTotal = useCartStore(state => state.cartTotal)
    const calculateCartTotals = useCartStore(state => state.calculateCartTotals)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const cart = useCartStore(state => state.cart)
    const fetchCart = useCartStore(state => state.fetchCart)

    useEffect(() => {
        fetchCart()
        calculateCartTotals()
    }, [])

    const handleCheckout = async () => {
        setLoading(true)

        try {
            const cartItems = cart.map(cartItem => ({
                id: cartItem.id,
                quantity: cartItem.quantity
            }))

            const accessToken = getAccessToken()
            const response = await axios.post(`${API_URL}/api/checkout`, cartItems , {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            if(response.status === 200) {
                router.push('/checkout')
            } else {
                console.error('Checkout error: ', response.data?.message)
                toast.error('Please try that again')
            }

        } catch(error) {
            console.error('Checkout error', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={handleCheckout}
                className='w-full h-11 sm:max-w-[450px] mx-auto px-7 flex items-center justify-between font-bold text-[15px] btn'
            >
                {
                    loading ? (
                        <>
                            <span>Processing...</span>
                            <span className='loading loading-spinner loading-sm'></span>
                        </>
                    ) : (
                        <>
                            <span>Go to checkout</span>
                            <span>₵{formatCurrency(String(cartTotal))}</span>
                        </>
                    )
                }
            </button>
        </>
    )
}


const PlaceOrderButton = ({ name, phone, notes, address, paymentMethod }: { name: string; phone: string; notes: string; address: string; paymentMethod: string; }) => {
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false)

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault()

        const normalizedPaymentMethod = paymentMethod === 'cash_on_delivery'
            ? 'CASH_ON_DELIVERY'
            : paymentMethod.toUpperCase()

        if (!name || !phone || !address || !paymentMethod) {
            toast.error('Please fill all required fields')
            return
        }

        setLoading(true)

        try {
            const accessToken = getAccessToken()
            const response = await axios.post(`${API_URL}/api/order`, {
                name,
                address,
                phone,
                notes: notes || null,
                paymentMethod: normalizedPaymentMethod // sending normalised value
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    
                }
            })
            console.log(response)

            if (response.status === 201 || response.status === 200) {
                toast.success('Order placed successfully!')
                console.log('Order placed', response.data)

                // handle Paystack/momo redirect
                if (response.data.paymentUrl) {
                    console.log(response.data.paymentUrl)
                    window.location.href = response.data.paymentUrl
                } else {
                    // for cash on delivery option
                    router.push('/profile/my-orders')
                }
            } else {
                console.error(response.data?.message || 'Unexpected response');
            }

        } catch(error: any) {
            console.error('Checkout error', error)
            // Display actual error message from backend if available
            const errorMessage = error.response?.data?.message ||
                error.message ||
                'From server: Failed to place order';
            toast.error(errorMessage);
            console.error(errorMessage)

        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                onClick={handlePlaceOrder}
                className='w-full max-w-[450px] mx-auto h-11 px-7 font-bold text-[15px] btn'
                type='submit'>
                {
                    loading ? (
                        <div className='flex item-center justify-center space-x-1.5'>
                            <span className='loading loading-spinner loading-sm'></span>
                            <span>Processing...</span>
                        </div>
                    ) : (
                            <span>Place Order</span>
                    )
                }
            </button>
        </>
    )
}

export { PlaceOrderButton, GoToCheckoutButton, AddToOrderButton }