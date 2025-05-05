'use client'

import { useState } from 'react'
import { IoHeartOutline, IoHeart } from 'react-icons/io5'
import { toast } from 'sonner'
// import useOrderStore from '@/stores/useOrderStore'
import { Product } from '@/lib/typeDefs'

const FavouriteProductIcon = ({ productId }: { productId: number }) => {
    // const { toggleFavouriteProduct, isMealFavourited, favouriteProducts } = useOrderStore()

    // get products from zustand store
    // const product = useProductsStore.getState().products.find(p => p.id === productId)
    // if (!product) return toast.error("Product not found") // exclude this
    // pass product to toggleFavouriteProduct

    // const isFavourited = isMealFavourited(productId)

    // const handleClick = () => {
    //     toggleFavouriteProduct(productId)
    //     if (isFavourited) {
    //         toast.success('Removed from favourites')
    //     } else {
    //         toast.success('Added to favourites!') // added 'product' to favourites
    //     }
    // }

    const isFavourited = true

     return (
          <button
               title='favourite button'
               type='button'
               onClick={() => {
                   // handleClick()
               }}
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


const FavouriteRestaurantIcon = ({ productId }: { productId: number }) => {
    // const { toggleFavouriteProduct, isMealFavourited, favouriteProducts } = useOrderStore()
    //
    //
    // const handleClick = () => {
    //     toggleFavouriteProduct(productId)
    //     if (isFavourited) {
    //         toast.success('Removed from favourites')
    //     } else {
    //         toast.success('Added to favourites!') // added 'product' to favourites
    //     }
    // }

    const isFavourited = true

     return (
          <button
               title='favourite button'
               type='button'
               onClick={() => {
                   // handleClick()
                   }
          }
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