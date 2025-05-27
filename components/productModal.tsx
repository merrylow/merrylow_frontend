'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import QuantitySelector from './quantitySelector'
import LoadingSpinner from '@/components/loadingSpinner'
import { FavouriteProductIcon } from './favouriteIcons'
import { AddToOrderButton } from '@/components/orderButtons'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { OrderNote } from '@/components/deliveryAndOrderNotes'
import { formatCurrency } from '@/lib/utilFunctions'
import { Product, SelectedAddons, SavedProductSelections } from '@/lib/typeDefs'
import useProductStore from '@/stores/useProductStore'
import useUserStore from '@/stores/useUserStore'
import AuthAlert from '@/components/authAlert'


const saveSelectionsToLocalStorage = (productId: string, selections: SavedProductSelections) => {
     localStorage.setItem(`productSelections_${productId}`, JSON.stringify({
          ...selections,
          // add timestamp for potential expiration later
          savedAt: Date.now()
     }))
}

const loadSelectionsFromLocalStorage = (productId: string): SavedProductSelections | null => {
     const saved = localStorage.getItem(`productSelections_${productId}`)
     if (!saved) return null

     const parsed = JSON.parse(saved)

     // checks if stored data is expired (24 hours)
     if (Date.now() - (parsed.savedAt || 0) > 24 * 60 * 60 * 1000) {
          localStorage.removeItem(`productSelections_${productId}`)
          return null
     }

     return {
          addons: parsed.addons || {
               package: '',
               compulsory: '',
               optional: []
          },
          quantity: parsed.quantity || 1,
          orderNote: parsed.orderNote || ''
     }
}

const clearSelectionsFromLocalStorage = (productId: string) => {
     localStorage.removeItem(`productSelections_${productId}`)
}




const ProductModal = ({ product }: { product: Product }) => {
     const [loading, setLoading] = useState(false)

     const productId = product.id

     const savedSelections = loadSelectionsFromLocalStorage(productId)
     const [quantity, setQuantity] = useState<number>(savedSelections?.quantity || 1);
     const [orderNote, setOrderNote] = useState<string>(savedSelections?.orderNote || '')
     const [selectedAddons, setSelectedAddons] = useState<SelectedAddons>(
         savedSelections?.addons || {
              package: '',
              compulsory: '',
              optional: [] as string[]
         }
     )

     const [showAuthAlert, setShowAuthAlert] = useState(false)
     const { isAuthenticated } = useUserStore()

     const handleAddToCart = () => {
          if (!isAuthenticated) {
               setShowAuthAlert(true)
               return false // prevents any further action
          }

          clearSelectionsFromLocalStorage(productId)
          return true // proceeds with add to cart
     }

     // saves to localStorage whenever addons or product or quantity or orderNote change
     useEffect(() => {
          saveSelectionsToLocalStorage(productId, {
               addons: selectedAddons,
               quantity,
               orderNote
          });
     }, [productId, selectedAddons, quantity, orderNote])



     // Clean up saved selections when modal closes (if authenticated)
     useEffect(() => {
          return () => {
               if (isAuthenticated) {
                    clearSelectionsFromLocalStorage(productId)
               }
          };
     }, [productId, isAuthenticated])




     // const matchingProduct: Product | undefined = products.find(product => product.id === productId)

     const selectPackageOption = (name: string) => {
          setSelectedAddons(prev => ({
               ...prev,
               package: name
          }))
     }


     const selectCompulsoryAddon = (name: string) => {
          setSelectedAddons(prev => ({
               ...prev,
               compulsory: name
          }))
     }


     const toggleOptionalAddon = (type: 'optional', name: string) => {
          setSelectedAddons(prev => {
               const list = prev[type]
               const exists = list.includes(name)
               return {
                    ...prev,
                    [type]: exists ? list.filter(item => item !== name) : [...list, name]
               }
          })
     }


     return (
         <main className='w-full max-w-[450px] h-full mx-auto bg-white flex flex-col justify-start rounded-t-4xl'>
              <div className='relative flex-1 relative overflow-y-auto'>
                   {loading ? (

                       <div className='w-full h-full flex justify-center items-center'>
                            <LoadingSpinner />
                       </div>
                   ) : (
                       <>
                            <section className='w-full h-64 rounded-t-4xl relative overflow-hidden'>
                                 <div className='bg-overlay' />
                                 <Image
                                     src={product.imageUrl}
                                     alt=''
                                     fill
                                     className='object-cover'
                                 />
                            </section>

                            <section className='flex-1 w-[88%] mx-auto mt-5 space-y-7 pb-32'>
                                 <div className='flex justify-between items-start'>
                                      <div>
                                           <h1 className='text-lg text-secondary-light font-extrabold'>{product?.name}</h1>
                                           <div className='flex items-center gap-2 mt-2'>
                                                {product && (
                                                    <span className='text-lg font-extrabold text-primary-main'>
                                                       ₵{formatCurrency(product.price)}
                                                    </span>
                                                )}
                                           </div>
                                      </div>
                                 </div>

                                 {
                                      product?.addOns?.package &&
                                      Object.keys(product.addOns.package).length > 0 ? (
                                           <div className='space-y-4'>
                                                <h2 className='text-md text-secondary-light font-semibold'>Packaging</h2>
                                                <RadioGroup value={selectedAddons.package} onValueChange={selectPackageOption} defaultValue={Object.keys(product.addOns.package)[1]}>
                                                     {Object.entries(product?.addOns.package ?? {}).map(([name, price]) => (
                                                         <div className='flex justify-between items-center' key={name}>
                                                              <div className='flex items-center gap-2'>
                                                                   <p className='text-sm text-black-soft'>{name}</p>
                                                              </div>
                                                              <div className='space-x-2.5 flex items-center'>
                                                                   <span className='text-base text-black-soft font-semibold'>+₵{formatCurrency(String(price))}</span>
                                                                   <RadioGroupItem
                                                                       className='border-primary-light'
                                                                       value={name}
                                                                       id={`option-${name}`}
                                                                   />
                                                              </div>
                                                         </div>
                                                     ))}
                                                </RadioGroup>
                                           </div>
                                      ) : (
                                          <></> // {/*maybe render just the heading with a no extras paragraph */}
                                      )
                                 }


                                 {product?.addOns?.compulsory &&
                                     Object.keys(product.addOns.compulsory).length > 0 && (
                                         <div className='space-y-4'>
                                              <h2 className='text-md text-secondary-light font-semibold'>Add more</h2>
                                              <RadioGroup
                                                  value={selectedAddons.compulsory}
                                                  onValueChange={selectCompulsoryAddon}
                                              >
                                                   {Object.entries(product.addOns.compulsory).map(([name, price]) => (
                                                       <div className='flex justify-between items-center' key={name}>
                                                            <div className='flex items-center gap-2'>
                                                                 <Label htmlFor={`compulsory-${name}`} className='text-sm text-black-soft'>
                                                                      {name}
                                                                 </Label>
                                                            </div>
                                                            <div className='space-x-2.5 flex items-center'>
                                                                 <span className='text-base text-black-soft font-semibold'>
                                                                     +₵{formatCurrency(String(price))}
                                                                 </span>
                                                                 <RadioGroupItem
                                                                     value={name}
                                                                     id={`compulsory-${name}`}
                                                                     className='border-primary-light'
                                                                 />
                                                            </div>
                                                       </div>
                                                   ))}
                                              </RadioGroup>
                                         </div>
                                 )}

                                 {product?.addOns?.optional &&
                                     Object.keys(product.addOns.optional).length > 0 && (
                                         <div className='space-y-4'>
                                              <h2 className='text-md text-secondary-light font-semibold'>Addons</h2>
                                              {Object.entries(product.addOns.optional).map(([name, price]) => (
                                                  <div className='flex justify-between items-center' key={name}>
                                                       <div className='flex items-center gap-2'>
                                                            <p className='text-sm text-black-soft'>{name}</p>
                                                       </div>
                                                       <div className='space-x-2.5 flex items-center'>
                                                            <span className='text-base text-black-soft font-semibold'>
                                                                +₵{formatCurrency(String(price))}
                                                            </span>
                                                            <Checkbox
                                                                className='border border-primary-light'
                                                                checked={selectedAddons.optional.includes(name)}
                                                                onCheckedChange={() => toggleOptionalAddon('optional', name)}
                                                                aria-label='optional-addon'
                                                            />
                                                       </div>
                                                  </div>
                                              ))}
                                         </div>
                                 )}

                                      <div className='space-y-2 sm:mb-10'>
                                           <h2 className='text-md text-secondary-light font-semibold'>Order note</h2>
                                           <OrderNote orderNote={orderNote} setOrderNote={setOrderNote} />
                                      </div>
                            </section>

                       </>
                   )}
              </div>

             <section className='fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[88%] max-w-[450px] mx-auto bg-transparent sm:ml-2 py-4 flex justify-between items-center md:gap-10'>
                  {product ? (
                      <QuantitySelector />
                  ) : null}

                  {product ? (
                      <AddToOrderButton
                          product={product}
                          quantity={quantity}
                          selectedAddons={selectedAddons}
                          orderNote={orderNote}
                          onAuthCheck={handleAddToCart}
                      />
                  ) : null}
             </section>

              {showAuthAlert && (
                  <AuthAlert onClose={() => setShowAuthAlert(false)} />
              )}
         </main>
     )
}

export default ProductModal