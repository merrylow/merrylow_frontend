import useCartStore
    from '@/stores/useCartStore'
import { IoMdClose } from 'react-icons/io'

const RemoveFromCartButton = ({  productId }: { productId: string }) => {
    const removeFromCart = useCartStore(state => state.removeFromCart)

    const handleRemoveCartItem = async () => {
        await removeFromCart(productId)
    }

    return (
        <div className='w-6 h-6'>
            <button onClick={handleRemoveCartItem} type='button' aria-label='close button'>
                <IoMdClose className='size-5 text-primary-light' />
            </button>
        </div>
    )
}


const ClearCartButton = () => {
    const clearCart = useCartStore(state => state.clearCart)

    const handleClearCart = async () => {
        await clearCart()
    }

    return (
        <div className='w-6 h-6'>
            <button onClick={handleClearCart} type='button' aria-label='close button'>
                Clear All
            </button>
        </div>
    )
}

export { RemoveFromCartButton }