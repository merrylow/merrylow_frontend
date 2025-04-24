import Image from 'next/image'
import Link from 'next/link'
import QuantitySelector from '@/components/quantitySelector'
import { FaChevronLeft } from 'react-icons/fa'


const orderItems = [
     {
          id: 1,
          name: 'Yam and palava sauce',
          price: '',
          image: {
               src: '/Yam and palava sauce-marg-tee.jpg',
               alt: 'Yam and palava sauce-marg-tee'
          },
          addons: {},

     }
]



const CartPage = () => {


     return (
          <div className='w-full h-full flex flex-col overflow-hidden'>
               <div className='flex-1 overflow-y-auto'>
                    {/* Header */}
                    <section className='flex justify-center items-center w-[90%] mx-auto mt-4'>
                         <h1 className='text-lg text-secondary-light font-bold'>Your order</h1>
                    </section>
                    
                    <section className='fixed flex justify-start items-center w-[90%] h-10 top-3.5 left-1/2 -translate-x-1/2 z-50'>
                         <Link href='/restaurants' aria-label='back button'>
                              <FaChevronLeft className='size-5 text-seconday-soft' />
                         </Link>
                    </section>


                    {/* Order Items */}
                    <section className='w-[90%] mx-auto mt-7'>
                         <h2 className='text-md text-secondary-light font-semibold mb-3'>Order items</h2>

                         {Array(4).fill(0).map((_, i) => (
                              <div className='flex justify-between items-start space-y-2 bg-white mb-3' key={i}>
                                   <div className='flex gap-3'>
                                        <div className='relative w-20 h-20 rounded-xl overflow-hidden'>
                                             <Image
                                                  src='/Yam and palava sauce-marg-tee.jpg'
                                                  alt='Yam and palava sauce'
                                                  fill
                                                  className='object-cover'
                                             />
                                        </div>
                                        <div>
                                             <h3 className='leading-none text-base font-semibold text-black-soft'>Yam and palava sauce</h3>
                                             <p className='text-xs text-secondary-soft'>+ Packaging fee<br />+ Parmesan cheese</p>
                                             <span className='text-primary-main font-bold text-[1rem] block mt-1'>₵12.50</span>
                                        </div>
                                   </div>

                                   <QuantitySelector />
                              </div>
                         ))}

                         {/* Total */}
                         <div className='flex justify-between items-center mt-4'>
                              <span className='text-md text-black-soft font-semibold'>Total</span>
                              <span className='text-primary-main text-md font-extrabold'>₵20.25</span>
                         </div>
                    </section>

                    {/* Recommendations */}
                    <section className='w-[90%] mx-auto mt-12 mb-24'>
                         <h2 className='text-md text-secondary-light font-semibold mb-3'>Recommendations</h2>
                         <div className='flex gap-3 overflow-x-auto'>
                              {Array(6).fill(0).map((_, i) => (
                                   // {/* Recommendation 1 */}
                                   <div className='min-w-[130px] flex-shrink-0 rounded-2xl bg-white shadow-lg p-2 mb-6' key={i}>
                                        <div className='relative w-full h-20 rounded-xl overflow-hidden mb-2'>
                                             <Image src='/Yam and palava sauce-marg-tee.jpg' alt='Tiramisu' fill className='object-cover' />
                                        </div>
                                        <div className='flex justify-between items-center'>
                                             <span className='text-primary-main font-bold text-sm'>₵10.00</span>
                                             <button className='w-4.5 h-4.5 rounded-md bg-primary-main text-white flex items-center justify-center text-base font-bold'>+</button>
                                        </div>
                                        <p className='text-xs text-black-soft mt-1'>Snack</p>
                                   </div>
                              ))}

                         </div>       
                    </section>
               </div>

               {/* Checkout section */}
               <section className='fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[90%] bg-transparent py-4 flex justify-between items-center'>
                    <Link href='/checkout' className='w-full h-12 px-7 flex items-center justify-between font-bold text-[15px] btn'>
                         <span>Go to checkout</span>
                         <span>c25.50</span>
                    </Link>
               </section>
     </div>
     )
}

export default CartPage