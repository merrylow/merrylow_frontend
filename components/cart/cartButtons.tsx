import useCartStore
    from '@/stores/useCartStore'
import { IoMdClose } from 'react-icons/io'

const RemoveFromCartButton = ({  productId }: { productId: string }) => {
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const { updateCartCount, calculateCartTotals } = useCartStore()

    const handleRemoveCartItem = async () => {
        await removeFromCart(productId)
        updateCartCount()
        calculateCartTotals()
    }

    return (
        <div className='w-6 h-6'>
            <button onClick={handleRemoveCartItem} className='rounded-full p-1.5 hover:bg-gray-100' type='button' aria-label='close button'>
                <IoMdClose className='size-5 text-primary-light' />
            </button>
        </div>
    )
}


const ClearCartButton = () => {
    const clearCart = useCartStore(state => state.clearCart)
    const { loading, updateCartCount, calculateCartTotals } = useCartStore()

    const handleClearCart = async () => {
        await clearCart()
        updateCartCount()
        calculateCartTotals()
    }

    return loading ? (
        <div className='flex items-center justify-center text-primary-light'>
            <span className='loading loading-spinner loading-sm' />
        </div>
    ) : (
        <div>
            <button onClick={handleClearCart} className='text-primary-light text-base cursor-pointer' type='button' aria-label='close button'>
                Clear All
            </button>
        </div>
    )

}

export { RemoveFromCartButton, ClearCartButton }