'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'



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

const AddToOrderButton = () => {
    const router = useRouter()

    return (
        <button
            onClick={() => {
                router.push('/cart')
            }}
            className='w-[55%] h-11 flex items-center justify-center font-bold text-[15px] btn'
        >
            Add to order
        </button>
    )
}

export { PlaceOrderButton, GoToCheckoutButton, AddToOrderButton }