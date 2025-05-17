'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Product, Addon, PackageOption } from '@/lib/typeDefs'
import useCartStore from '@/stores/useCartStore'
import { useEffect, useState } from 'react'
import axios from 'axios'


const API_URL = process.env.NEXT_PUBLIC_API_URL

const AddToOrderButton = ({ product, quantity, selectedAddons, orderNote, packageOption }: { product: Product, quantity: number, selectedAddons: Addon[] | null, orderNote: string | null, packageOption: PackageOption | null }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const addToCart = useCartStore(state => state.addToCart)
    const router = useRouter()

    const handleClick = () => {
        setLoading(true)
        try {
            addToCart(product, quantity, selectedAddons, packageOption, orderNote)
            toast.success('Your order has been added!')
            router.push('/cart')
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
            className='w-[55%] h-[2.65rem] flex items-center justify-center font-bold text-sm btn'
        >
            Add to order
            {
                loading ? <span className='loading loading-spinner loading-sm'></span> : ''
            }
        </button>
    )
}


const GoToCheckoutButton = () => {
    const cartTotal = useCartStore(state => state.cartTotal)
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const cart = useCartStore(state => state.cart)

    const handleCheckout = async () => {
        try {
            setLoading(true)

            const formattedItems = cart.map(cartItem => ({
                id: cartItem.id,
                quantity: cartItem.quantity
            }))

            const response = await axios.post(`${API_URL}/api/checkout`, {formattedItems})

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
                className='w-full h-11 px-7 flex items-center justify-between font-bold text-[15px] btn'
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
                            <span>₵{cartTotal}</span>
                        </>
                    )
                }
            </button>
        </>
    )
}


const PlaceOrderButton = () => {
    const router = useRouter()

    return (
        <>
            <button className='w-full h-11 px-7 font-bold text-[15px] btn' type='submit'>
                Place Order
            </button>
        </>
    )
}

export { PlaceOrderButton, GoToCheckoutButton, AddToOrderButton }