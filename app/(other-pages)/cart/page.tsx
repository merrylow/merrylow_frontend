'use client'

import { useEffect, useState } from 'react'
import useCartStore from '@/stores/useCartStore'
import { CartItem } from '@/lib/typeDefs'
import { formatCurrency } from '@/lib/utilFunctions'
import Image from 'next/image'
import BackButton from '@/components/backButton'
import { GoToCheckoutButton } from '@/components/orderButtons'
import EmptyCart from '@/components/emptyCart'
import LoadingSpinner from '@/components/loadingSpinner'
import { RemoveFromCartButton, ClearCartButton } from '@/components/cart/cartButtons'

const CartPage = () => {
    // const parseAddons = (addonsString: string) => {
    //     try {
    //         return JSON.parse(addonsString)
    //     } catch (error) {
    //         console.error('Error parsing addons:', error)
    //         return {}
    //     }
    // }

    const parseAddons = (description: string) => {
        try {
            // Clean up the string if it contains escape characters
            const cleanedString = description.replace(/\\/g, '')

            // Parse the JSON string
            const parsed = JSON.parse(cleanedString)

            // Handle different possible formats
            if (Array.isArray(parsed)) {
                // If it's an array, convert to object format
                const result: Record<string, number> = {}
                for (let i = 0; i < parsed.length; i += 2) {
                    if (i + 1 < parsed.length) {
                        result[parsed[i]] = parsed[i + 1]
                    }
                }
                return result
            } else if (typeof parsed === 'object' && parsed !== null) {
                // If it's already an object, return it
                return parsed
            }

            return {}
        } catch (error) {
            console.error('Error parsing addons:', error)
            return {}
        }
    }


    const { cart, fetchCart, initializeCart, cartTotal, updateCartCount, calculateCartTotals } = useCartStore()
     const [loading, setLoading] = useState(true)


    useEffect(() => {
        const loadCart = async () => {
            try {
                initializeCart()

                await fetchCart()
            } catch (error) {
                console.error('Failed to load cart:', error)
            } finally {
                setLoading(false);
            }
        }
        loadCart().then(r => console.log('Loaded cart'));
    }, []);

    useEffect(() => {
        updateCartCount()
        calculateCartTotals()
    }, [cart])


    if (loading) {
        return (
            <div className='w-[90%] h-screen flex items-center justify-center mx-auto'>
                <LoadingSpinner />
            </div>
        );
    }

    if (!cart || cart.length === 0) {
        return (
            <main className='w-[90%] h-screen flex items-center justify-center mx-auto'>
                <EmptyCart />
            </main>
        )
    }


    const calculateItemTotal = (item: CartItem) => {
        // if unitPrice is available from backend, use that
        if (item.unitPrice) {
            return Number(item.unitPrice) * item.quantity
        }

        // fallback calculation if unitPrice isnt available
        if (!item.menu) return 0

        const basePrice = Number(item.menu.price) || 0

        const addons = item.description ? parseAddons(item.description) : {}

        // sums up all addon prices
        const addonsTotal = Object.values(addons).reduce((sum: number, price) => {
            return sum + (Number(price) || 0)
        }, 0)

        return (basePrice + addonsTotal) * item.quantity
    }


    const renderAddons = (addons: Record<string, any>) => {
        return Object.entries(addons).map(([key, value]) => {
            // skip special keys or non-addon items
            if (key === 'name' || typeof value !== 'number') return null

            return (
                <p key={key} className="text-xs text-secondary-soft">
                    + {key} (₵{formatCurrency(String(value))})
                </p>
            )
        })
    }


     return (
          <main className='w-full h-full flex flex-col overflow-hidden'>
               <div className='flex-1 overflow-y-auto'>
                    {/* Header */}
                    <section className='flex justify-center items-center w-[90%] mx-auto mt-4'>
                         <h1 className='text-lg text-secondary-light font-bold'>
                             {
                                 cart.length > 0 ? 'Your order' : ''
                             }
                         </h1>
                    </section>

                   {
                       cart.length > 0 ? (
                           <section className='fixed flex justify-end items-center w-[90%] md:max-w-[410px] h-10 top-3 right-1/2 translate-x-1/2 mx-auto z-50'>
                               <ClearCartButton />
                           </section>
                       ) : (
                           <></>
                       )
                   }
                    
                    <section className='fixed flex justify-start items-center w-[90%] sm:max-w-[410px] h-10 top-3 left-1/2 -translate-x-1/2 mx-auto z-50'>
                         <BackButton />
                    </section>


                    {/* Order Items */}
                        <section className='w-[90%] mx-auto mt-6'>
                            {cart.map((cartItem: CartItem, i) => {
                                const addons = cartItem.description ? parseAddons(cartItem.description) : {}

                                return (
                                    <div
                                        className='flex justify-between items-start space-y-2 bg-white mb-3 border-b border-gray-100 z-10'
                                        key={i}>
                                        <div
                                            className='flex gap-3'>
                                            <div
                                                className='relative flex-shrink-0 w-21 h-20 rounded-xl overflow-hidden'>
                                                <Image
                                                    src={cartItem?.menu?.imageUrl!}
                                                    alt=''
                                                    width={85}
                                                    height={80}
                                                    className='object-cover'
                                                />
                                            </div>
                                            <div>
                                                <h3 className='leading-none text-base font-semibold text-black-soft'>{cartItem?.menu?.name}</h3>
                                                <div className='grid grid-cols-2 gap-x-2 mt-1'>
                                                    {/*{Object.entries(addons).map(([addonName, addonPrice]) => (*/}
                                                    {/*    addonPrice !== 0 && (*/}
                                                    {/*        <p key={addonName} className="text-xs text-secondary-soft">*/}
                                                    {/*            + {addonName} (₵{formatCurrency(String(addonPrice))})*/}
                                                    {/*        </p>*/}
                                                    {/*    )*/}
                                                    {/*))}*/}
                                                    {renderAddons(addons)}
                                                </div>

                                                <span
                                                    className='text-primary-main font-bold text-[1rem] block mt-1'>
                                                      ₵{formatCurrency(String(calculateItemTotal(cartItem)))}
                                                </span>
                                            </div>
                                        </div>

                                        {/*<QuantitySelector />*/}
                                        <RemoveFromCartButton
                                            productId={cartItem.id}/>
                                    </div>
                                )
                            })}


                             {/* Total */}
                             <div className='flex justify-between items-center mt-4 sm:mb-24'>
                                  <span className='text-md text-black-soft font-bold'>Total</span>
                                  <span className='text-primary-main text-md font-extrabold'>₵{formatCurrency(String(cartTotal))}</span>
                             </div>
                        </section>

               </div>

               {/* Checkout section */}
               {cart.length > 0 && (

                   <section className="fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[90%] bg-transparent py-4 flex justify-between items-center">
                       <GoToCheckoutButton />
                   </section>
               )}
         </main>
     )
}

export default CartPage



                    {/* Recommendations */}
               {/*     <section className='w-[90%] mx-auto mt-12 mb-24'>*/}
               {/*          <h2 className='text-md text-secondary-light font-semibold mb-3'>Recommendations</h2>*/}
               {/*          <div className='flex gap-3 overflow-x-auto'>*/}
               {/*               {Array(6).fill(0).map((_, i) => (*/}
               {/*                    // /!* Recommendation 1 *!/*/}
               {/*                    <div className='min-w-[130px] flex-shrink-0 rounded-2xl bg-white shadow-lg p-2 mb-6' key={i}>*/}
               {/*                         <div className='relative w-full h-20 rounded-xl overflow-hidden mb-2'>*/}
               {/*                              <Image src='/Yam and palava sauce-marg-tee.jpg' alt='Tiramisu' fill className='object-cover' />*/}
               {/*                         </div>*/}
               {/*                         <div className='flex justify-between items-center'>*/}
               {/*                              <span className='text-primary-main font-bold text-sm'>₵10.00</span>*/}
               {/*                              <button className='w-4.5 h-4.5 rounded-md bg-primary-main text-white flex items-center justify-center text-base font-bold'>+</button>*/}
               {/*                         </div>*/}
               {/*                         <p className='text-xs text-black-soft mt-1'>Snack</p>*/}
               {/*                    </div>*/}
               {/*               ))}*/}

               {/*          </div>       */}
               {/*     </section>*/}
