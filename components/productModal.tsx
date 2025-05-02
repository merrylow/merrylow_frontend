// import Image from 'next/image'
// import Link from 'next/link'
// import { FaChevronLeft } from 'react-icons/fa6'
// import QuantitySelector from './quantitySelector'
// import Modal from "./modal"
// import FavouriteIcon from './favouriteIcon'
// import { AddToOrderButton } from '@/components/orderButtons'
//
// const ProductModal = async ({ params }: { params: Promise<{ restaurantId: string, productId: string }> }) => {
//      const { restaurantId, productId } = await params
//
//      return (
//           <>
//                <Modal>
//                     <div className="w-full h-full flex flex-col justify-start rounded-t-4xl overflow-hidden">
//                          <div className="flex-1 overflow-y-auto">
//                               {/* Product Image */}
//                               <section className="w-full h-64 rounded-t-4xl relative overflow-hidden">
//                                    <div className='bg-overlay' />
//                                    <Image
//                                         src="/Yam and palava sauce-marg-tee.jpg"
//                                         alt="yam and palava sauce"
//                                         fill
//                                         className="object-cover"
//                                    />
//                               </section>
//
//                               {/* Back Button */}
//                               <section className="fixed flex justify-start items-center w-[88%] h-10 top-36 left-1/2 -translate-x-1/2 z-50">
//                                    <Link
//                                         href={`/restaurants/${restaurantId}`}
//                                         className='navigation-btn'
//                                         aria-label='back button'
//                                    >
//                                         <FaChevronLeft className='size-5 fill-gray-pale' />
//                                    </Link>
//                               </section>
//
//
//                               {/* Main Content */}
//                               <section className="flex-1 w-[88%] mx-auto mt-6 space-y-6 pb-32">
//                                    {/* Product Info */}
//                                    <div className="flex justify-between items-start">
//                                         <div>
//                                              <h1 className="text-lg text-secondary-light font-extrabold">Yam and palava sauce</h1>
//                                              <p className="text-base text-secondary-soft">Meal description</p>
//                                              <div className="flex items-center gap-2 mt-2">
//                                                   <span className="text-lg font-extrabold text-primary-main">₵20.00</span>
//                                              </div>
//                                         </div>
//                                         <FavouriteIcon />
//                                    </div>
//
//                                    {/* Add More Section */}
//                                    <div className="space-y-4">
//                                         <h2 className="text-md text-secondary-light font-semibold">Add more</h2>
//
//                                         {Array(7).fill(0).map((_, i) => (
//                                              <div className="flex justify-between items-center" key={i}>
//                                                   <div className="flex items-center gap-2">
//                                                        <p className="text-sm text-black-soft">Chicken</p>
//                                                   </div>
//                                                   <div className='space-x-2.5 flex items-center'>
//                                                        <span className="text-base text-black-soft font-semibold">+₵20.50</span>
//                                                        <span className='inline-flex items-center justify-center'>
//                                                             <label className='relative inline-block w-5 h-5' >
//                                                                  <input className='peer appearance-none w-4 h-4 border-2 border-primary-main rounded bg-white checked:bg-primary-main flex-shrink-0 transition-colors'
//                                                                  type='checkbox' aria-label='menu-item checkbox'
//                                                                  />
//                                                                  <svg className='absolute inset-0 m-auto w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none'
//                                                                  viewBox="3 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
//                                                                       <polyline points="20 6 9 17 4 12" />
//                                                                  </svg>
//                                                             </label>
//                                                        </span>
//                                                   </div>
//                                              </div>
//                                         ))}
//                                    </div>
//
//                                    {/* Package Section */}
//                                    <div className="space-y-4">
//                                         <h2 className="text-md text-secondary-light font-semibold">Package</h2>
//
//                                         {Array(2).fill(0).map((_, i) => (
//                                              <div className="flex justify-between items-center" key={i}>
//                                                   <div className="flex items-center gap-2">
//                                                        <p className="text-sm text-black-soft">Package box cost</p>
//                                                   </div>
//                                                   <div className='space-x-2.5 flex items-center'>
//                                                        <span className="text-base text-black-soft font-semibold">+₵0.50</span>
//                                                        <span className='inline-flex items-center justify-center'>
//                                                             <input type='radio' name='menuOption' aria-label='menu-item radio' className='appearance-none w-4 h-4 border-2 border-primary-main rounded-full bg-white checked:bg-primary-main checked:border-primary-main flex-shrink-0 transition-colors' />
//                                                        </span>
//                                                   </div>
//                                              </div>
//
//                                         ))}
//                                    </div>
//                               </section>
//                          </div>
//
//                          {/* Bottom Action Bar */}
//                          <section className="fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[88%] bg-transparent py-4 flex justify-between items-center">
//                               <QuantitySelector />
//
//                               <AddToOrderButton />
//                          </section>
//                     </div>
//                </Modal>
//           </>
//      )
// }
//
// export default ProductModal



'use client'

import Image from 'next/image'
import Link from 'next/link'
import QuantitySelector from './quantitySelector'
import FavouriteIcon from './favouriteIcon'
import { AddToOrderButton } from '@/components/orderButtons'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { useMediaQuery } from 'usehooks-ts'
import { IoClose } from 'react-icons/io5'
import {
     DrawerClose
} from "@/components/ui/drawer";

type Props = {
    restaurantId: string
    productId: string
}

const ProductModal = ({ restaurantId, productId }: Props) => {
     // const isDesktop = useMediaQuery('(min-width: 768px)')

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

                   <section className='flex-1 w-[88%] mx-auto mt-5 space-y-6 pb-32'>
                        <div className='flex justify-between items-start'>
                             <div>
                                  <h1 className='text-lg text-secondary-light font-extrabold'>Yam and palava sauce</h1>
                                  <p className='text-base text-secondary-soft'>Meal description</p>
                                  <div className='flex items-center gap-2 mt-2'>
                                       <span className='text-lg font-extrabold text-primary-main'>₵20.00</span>
                                  </div>
                             </div>
                             <FavouriteIcon />
                        </div>

                        <div className='space-y-4'>
                             <h2 className='text-md text-secondary-light font-semibold'>Add more</h2>

                             {Array(7).fill(0).map((_, i) => (
                                 <div className='flex justify-between items-center' key={i}>
                                      <div className='flex items-center gap-2'>
                                           <p className='text-sm text-black-soft'>Chicken</p>
                                      </div>
                                      <div className='space-x-2.5 flex items-center'>
                                           <span className='text-base text-black-soft font-semibold'>+₵20.50</span>
                                           <Checkbox aria-label='menu-item checkbox' />
                                      </div>
                                 </div>
                             ))}
                        </div>

                        <div className='space-y-4'>
                             <h2 className='text-md text-secondary-light font-semibold'>Package</h2>

                             <RadioGroup>
                                  {Array(2).fill(0).map((_, i) => (
                                      <div className='flex justify-between items-center' key={i}>
                                           <div className='flex items-center gap-2'>
                                                <p className='text-sm text-black-soft'>Package box cost</p>
                                           </div>
                                           <div className='space-x-2.5 flex items-center'>
                                                <span className='text-base text-black-soft font-semibold'>+₵0.50</span>
                                                <RadioGroupItem value={`option-${i}`} id={`option-${i}`} />
                                           </div>
                                      </div>
                                  ))}
                             </RadioGroup>
                        </div>
                   </section>
                   <section className='fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[88%] bg-transparent py-4 flex justify-between items-center'>
                        <QuantitySelector />
                        <AddToOrderButton />
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