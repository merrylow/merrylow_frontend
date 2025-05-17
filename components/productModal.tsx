'use client'

import { useState } from 'react'
import Image from 'next/image'
import QuantitySelector from './quantitySelector'
import { FavouriteProductIcon } from './favouriteIcons'
import { AddToOrderButton } from '@/components/orderButtons'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { OrderNote } from '@/components/deliveryAndOrderNotes'
import { formatCurrency } from '@/lib/utilFunctions'
import { Product, Addon, PackageOption } from '@/lib/typeDefs'

const ProductModal = ({ product }: { product: Product }) => {
     const [quantity, setQuantity] = useState<number>(1)
     const [selectedAddons, setSelectedAddons] = useState<Addon[]>([])
     const [packageOption, setPackageOption] = useState<PackageOption | null>(null)
     const [orderNote, setOrderNote] = useState('')

     // const toggleAddon = (addonId: string) => {
     //      setSelectedAddons(prev => ({
     //           ...prev,
     //           [addonId]: !prev[addonId]
     //      }))
     // }

     return(
         <div className='w-full h-full bg-white flex flex-col justify-start rounded-t-4xl overflow-hidden'>
              <div className='flex-1 relative overflow-y-auto'>
                   <section className='w-full h-64 rounded-t-4xl relative overflow-hidden'>
                        <div className='bg-overlay' />
                        <Image
                            src='/Yam and palava sauce-marg-tee.jpg'
                            alt='yam and palava sauce'
                            fill
                            className='object-cover'
                        />
                   </section>

                   <section className='flex-1 w-[88%] mx-auto mt-5 space-y-7 pb-32'>
                        <div className='flex justify-between items-start'>
                             <div>
                                  <h1 className='text-lg text-secondary-light font-extrabold'>{product?.name}</h1>
                                  {/*<p className='text-base text-secondary-soft'>Meal description</p>*/}
                                  <div className='flex items-center gap-2 mt-2'>
                                       <span className='text-lg font-extrabold text-primary-main'>₵{formatCurrency(product?.price)}</span>
                                  </div>
                             </div>
                             {/*<FavouriteProductIcon product={product} />*/}
                        </div>

                        <div className='space-y-4'>
                             <h2 className='text-md text-secondary-light font-semibold'>Add more</h2>

                             {/*{product.addOns?.map(addon => (*/}
                             {/*    <Label key={addon.id}>*/}
                             {/*         <Checkbox*/}
                             {/*             checked={selectedAddons[addon.id] || false}*/}
                             {/*             onCheckedChange={() => toggleAddon(addon.id)}*/}
                             {/*         />*/}
                             {/*         {addon.name}*/}
                             {/*    </label>*/}
                             {/*))}*/}
                             {Array(7).fill(0).map((_, i) => (
                                 <div className='flex justify-between items-center' key={i}>
                                      <div className='flex items-center gap-2'>
                                           <p className='text-sm text-black-soft'>Chicken</p>
                                      </div>
                                      <div className='space-x-2.5 flex items-center'>
                                           <span className='text-base text-black-soft font-semibold'>+₵20.50</span>
                                           <Checkbox
                                               className={'border border-primary-light'}
                                               aria-label='menu-item checkbox'
                                               // // checked={selectedAddons.includes('Chicken')}
                                               // // onCheckedChange={(checked) =>
                                               // //     setSelectedAddons((prev) =>
                                               //     {/*checked ? [...prev, 'chicken'] : prev.filter(item => item !== 'chicken'))}*/}
                                           />
                                      </div>
                                 </div>
                             ))}
                        </div>

                        <div className='space-y-4'>
                             <h2 className='text-md text-secondary-light font-semibold'>Package</h2>

                             {/*{product.packageOptions?.map(option => (*/}
                             {/*    <label key={option}>*/}
                             {/*         <input*/}
                             {/*             type="radio"*/}
                             {/*             name="packageOption"*/}
                             {/*             value={option}*/}
                             {/*             checked={packageOption === option}*/}
                             {/*             onChange={() => setPackageOption(option)}*/}
                             {/*         />*/}
                             {/*         {option}*/}
                             {/*    </label>*/}
                             {/*))}*/}
                             <RadioGroup>
                                  {Array(2).fill(0).map((_, i) => (
                                      <div className='flex justify-between items-center' key={i}>
                                           <div className='flex items-center gap-2'>
                                                <p className='text-sm text-black-soft'>Package box cost</p>
                                           </div>
                                           <div className='space-x-2.5 flex items-center'>
                                                <span className='text-base text-black-soft font-semibold'>+₵0.50</span>
                                                <RadioGroupItem
                                                    className={'border-primary-light'}
                                                    value={`option-${i}`}
                                                    // value={packageOption}
                                                    // onValueChange={setSelectedPackage}
                                                    id={`option-${i}`}
                                                />
                                           </div>
                                      </div>
                                  ))}
                             </RadioGroup>
                        </div>

                        <div className='space-y-2'>
                             <h2 className="text-md text-secondary-light font-semibold">Order note</h2>

                             <OrderNote orderNote={orderNote} setOrderNote={setOrderNote} />
                        </div>
                   </section>
                   <section className='fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[88%] bg-transparent py-4 flex justify-between items-center'>
                        <QuantitySelector />
                        <AddToOrderButton
                            product={product}
                            quantity={quantity}
                            selectedAddons={selectedAddons}
                            packageOption={packageOption}
                            orderNote={orderNote}
                        />
                   </section>
              </div>
         </div>
     )

     // return isDesktop ? (
     //     <Dialog>
     //          <DialogContent className='p-0 max-w-full h-[90%] overflow-hidden rounded-2xl'>
     //               {Content}
     //          </DialogContent>
     //     </Dialog>
     // ) : (
     //     <Drawer>
     //          <DrawerContent className='p-0 max-w-full h-[85vh] overflow-hidden rounded-t-4xl'>
     //               {Content}
     //          </DrawerContent>
     //     </Drawer>
     // )
}

export default ProductModal