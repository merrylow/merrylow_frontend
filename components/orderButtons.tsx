'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Product } from '@/lib/typeDefs'
import useCartStore from '@/stores/useCartStore'


const AddToOrderButton = ({ product, quantity, selectedAddons, orderNote, packageOption }: { product: Product, quantity: number, selectedAddons: {} | null, orderNote: string | null, packageOption: string }) => {
    const addToCart = useCartStore(state => state.addToCart)
    const router = useRouter()

    const handleClick = () => {
        addToCart(product, quantity, selectedAddons, packageOption, orderNote)
        toast.success('Your order has been added!')

        router.push('/cart')
    }

    return (
        <button
            onClick={handleClick}
            className='w-[55%] h-[2.65rem] flex items-center justify-center font-bold text-sm btn'
        >
            Add to order
        </button>
    )
}


const GoToCheckoutButton = () => {
    const router = useRouter()

    return (
        <>
            <button
                onClick={() => router.push('/checkout')}
                className='w-full h-11 px-7 flex items-center justify-between font-bold text-[15px] btn'
            >
                <span>Go to checkout</span>
                <span>₵25.50</span>
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