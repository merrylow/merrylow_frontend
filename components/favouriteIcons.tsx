'use client'

import { useMemo } from 'react'
import { IoHeartOutline, IoHeart } from 'react-icons/io5'
import { toast } from 'sonner'
import useProductStore from '@/stores/useProductStore'
import { Product, Restaurant } from '@/lib/typeDefs'
import { useShallow } from 'zustand/react/shallow'

const FavouriteProductIcon = ({ product }: { product: Product }) => {
    const { toggleFavouriteProduct, isProductFavourited } = useProductStore(
        useShallow((state) => ({
            toggleFavouriteProduct: state.toggleFavouriteProduct,
            // favouriteProducts: state.favouriteProducts,
            isProductFavourited: state.isProductFavourited,
        }))
    )

    // const isFavourited = isProductFavourited(product)
    //
    // const handleClick = () => {
    //     toggleFavouriteProduct(product)
    //
    //     if (isFavourited) {
    //         toast.success('Removed from favourites')
    //     } else {
    //         toast.success('Added to favourites!')
    //     }
    // }

    const isFavourited = true

    return (
        <button
            title='favourite button'
            type='button'
            // onClick={handleClick}
            className='flex items-center justify-center rounded-full transition-colors duration-300 border-none outline-none'
        >
            {isFavourited === true ? (
                <IoHeart className='size-9 fill-primary-main' />
            ) : (
                <IoHeartOutline className='size-9 text-primary-main' />
            )}
        </button>
    )
}



const FavouriteRestaurantIcon = ({ restaurant }: { restaurant: Restaurant }) => {
    // const { toggleFavouriteProduct, isMealFavourited, favouriteProducts } = useProductStore()
    //

    // const restaurant = useProductsStore.getState().restaurants.find(restaurant => restaurant.id === productId)
    // if (!product) return toast.error("Product not found") // exclude this
    // pass product to toggleFavouriteProduct
    //
    // const handleClick = () => {
    //     toggleFavouriteProduct(productId)
    //     if (isFavourited) {
    //         toast.success('Removed from favourites')
    //     } else {
    //         toast.success('Added to favourites!') // added 'product' to favourites
    //     }
    // }


    const { toggleFavouriteRestaurant, isRestaurantFavourited } = useProductStore(
        useShallow((state) => ({
            toggleFavouriteRestaurant: state.toggleFavouriteRestaurant,
            // favouriteRestaurants: state.favouriteRestaurants,
            isRestaurantFavourited: state.isRestaurantFavourited,
        }))
    )

    // const isFavourited = isRestaurantFavourited(restaurant)

    // const handleClick = () => {
    //     toggleFavouriteRestaurant(restaurant)
    //
    //     if (isFavourited) {
    //         toast.success('Removed from favourites')
    //     } else {
    //         toast.success('Added to favourites!')
    //     }
    // }


    const isFavourited = true

    return (
          <button
               title='favourite button'
               type='button'
               // onClick={handleClick}
               className='flex items-center justify-center rounded-full transition-colors duration-300 border-none outline-none'
          >
               {isFavourited === true ? (
                    <IoHeart className='size-9 fill-primary-main' />
               ) : (
                    <IoHeartOutline className='size-9 text-primary-main' />
               )}
          </button>
     )
}


export { FavouriteProductIcon, FavouriteRestaurantIcon }