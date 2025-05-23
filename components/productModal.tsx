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
import { Product, SelectedAddons } from '@/lib/typeDefs'
import useProductStore from '@/stores/useProductStore'

const ProductModal = ({ productId }: { productId: string }) => {
     const { products, fetchProducts, loading } = useProductStore()
     const [quantity, setQuantity] = useState<number>(1)
     const [selectedAddons, setSelectedAddons] = useState<SelectedAddons>({
          package: '',
          compulsory: '',
          optional: [] as string[]
     })
     const [orderNote, setOrderNote] = useState('')

     useEffect(() => {
          fetchProducts().catch(error => console.log(error))
     }, [])

     const matchingProduct: Product | undefined = products.find(product => product.id === productId)

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
          }));
     };


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
         <main className='w-full max-w-[450px] h-full mx-auto bg-white flex flex-col justify-start rounded-t-4xl overflow-hidden'>
              <div className='flex-1 relative overflow-y-auto'>
                   {loading ? (

                       <div className='w-full h-full flex justify-center items-center'>
                            <LoadingSpinner />
                       </div>
                   ) : (
                       <>
                            <section className='w-full h-64 rounded-t-4xl relative overflow-hidden'>
                                 <div className='bg-overlay' />
                                 <Image
                                     src='/Yam and palava sauce-marg-tee.jpg'
                                     alt=''
                                     fill
                                     className='object-cover'
                                 />
                            </section>

                            <section className='flex-1 w-[88%] mx-auto mt-5 space-y-7 pb-32'>
                                 <div className='flex justify-between items-start'>
                                      <div>
                                           <h1 className='text-lg text-secondary-light font-extrabold'>{matchingProduct?.name}</h1>
                                           <div className='flex items-center gap-2 mt-2'>
                                                {matchingProduct && (
                                                    <span className='text-lg font-extrabold text-primary-main'>
                                                       ₵{formatCurrency(matchingProduct.price)}
                                                    </span>
                                                )}
                                           </div>
                                      </div>
                                 </div>

                                 {
                                      matchingProduct?.addOns.package ? (
                                           <div className='space-y-4'>
                                                <h2 className='text-md text-secondary-light font-semibold'>Packaging</h2>
                                                <RadioGroup value={selectedAddons.package} onValueChange={selectPackageOption}>
                                                     {Object.entries(matchingProduct?.addOns.package ?? {}).map(([name, price]) => (
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
                                          <></>
                                      )
                                 }

                                 {/*<div className='space-y-4'>*/}
                                      {/*<h2 className='text-md text-secondary-light font-semibold'>Add more</h2>*/}
                                      {/*<RadioGroup>*/}
                                      {/*    {Object.entries(matchingProduct?.addOns.compulsory ?? {}).map(([name, price]) => (*/}
                                      {/*        <div className='flex justify-between items-center' key={name}>*/}
                                      {/*             <div className='flex items-center gap-2'>*/}
                                      {/*                  <p className='text-sm text-black-soft'>{name}</p>*/}
                                      {/*             </div>*/}
                                      {/*             <div className='space-x-2.5 flex items-center'>*/}

                                      {/*                  <span className='text-base text-black-soft font-semibold'>+₵{formatCurrency(String(price))}</span>*/}
                                      {/*                  <RadioGroupItem*/}
                                      {/*                      className='border-primary-light'*/}
                                      {/*                      value={name}*/}
                                      {/*                      id={`option-${name}`}*/}
                                      {/*                  />*/}
                                      {/*             </div>*/}
                                      {/*        </div>*/}
                                      {/*    ))}*/}
                                      {/*</RadioGroup>*/}
                                 {/*</div>*/}

                                      <div className='space-y-4'>
                                           <h2 className='text-md text-secondary-light font-semibold'>Add more</h2>
                                           <RadioGroup
                                               value={selectedAddons.compulsory}
                                               onValueChange={selectCompulsoryAddon}
                                           >
                                                {Object.entries(matchingProduct?.addOns.compulsory ?? {}).map(([name, price]) => (
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

                                 <div className='space-y-4'>
                                      <h2 className='text-md text-secondary-light font-semibold'>Addons</h2>
                                      {Object.entries(matchingProduct?.addOns.optional ?? {}).map(([name, price]) => (
                                          <div className='flex justify-between items-center' key={name}>
                                               <div className='flex items-center gap-2'>
                                                    <p className='text-sm text-black-soft'>{name}</p>
                                               </div>
                                               <div className='space-x-2.5 flex items-center'>
                                                    <span className='text-base text-black-soft font-semibold'>+₵{formatCurrency(String(price))}</span>
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

                                 <div className='space-y-2'>
                                      <h2 className='text-md text-secondary-light font-semibold'>Order note</h2>
                                      <OrderNote orderNote={orderNote} setOrderNote={setOrderNote} />
                                 </div>
                            </section>

                            <section className='fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[88%] max-w-[450px] mx-auto bg-transparent sm:ml-2 py-4 flex justify-between items-center'>
                                 <QuantitySelector />
                                 <AddToOrderButton
                                     product={matchingProduct!}
                                     quantity={quantity}
                                     selectedAddons={selectedAddons}
                                     orderNote={orderNote}
                                 />
                            </section>
                       </>
                   )}
              </div>
         </main>
     )
}

export default ProductModal