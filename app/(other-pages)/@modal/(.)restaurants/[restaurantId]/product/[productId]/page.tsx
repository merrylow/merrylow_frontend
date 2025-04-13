import Image from 'next/image'
import Link from 'next/link'
import { FaChevronLeft } from "react-icons/fa6"
import { IoHeartOutline } from "react-icons/io5"
import ProductModal from "@/components/modal"

const ProductPage = () => {

     return (
          <ProductModal>
               <div className="w-full h-full flex flex-col justify-start">
                    <div className="flex-1 overflow-y-auto">

                    {/* Product Image */}
                    <section className="w-full h-64 rounded-t-4xl relative overflow-hidden">
                         <Image
                              src="/Yam and palava sauce-marg-tee.jpg" 
                              alt="yam and palava sauce"
                              fill
                              className="object-cover"
                         />
                    </section>

                    {/* Back Button */}
                    <section className="fixed flex justify-start items-center w-[88%] h-10 top-36 left-1/2 -translate-x-1/2">
                         <Link
                              href='/restaurants'
                              className='w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md bg-black/20 shadow-[2px_5px_11px_rgba(0,1,0,0.45)] transition-all'
                              aria-label='Go back'
                         >
                              <FaChevronLeft className='size-4 fill-gray-pale' />
                         </Link>
                    </section>


                    {/* Main Content */}
                    <section className="flex-1 w-[88%] mx-auto mt-6 space-y-6 pb-32">

                         {/* Product Info */}
                         <div className="flex justify-between items-start">
                              <div>
                                   <h1 className="text-xl text-secondary-light font-extrabold">Yam and palava sauce</h1>
                                   <p className="text-md text-secondary-soft">Meal description</p>
                                   <div className="flex items-center gap-2 mt-2">
                                        <span className="text-lg font-extrabold text-primary-main">₵20.00</span>
                                   </div>
                              </div>
                              <IoHeartOutline className='size-8' />
                         </div>

                         {/* Add More Section */}
                         <div className="space-y-4">
                              <h2 className="text-lg text-secondary-light font-bold">Add more</h2>

                              {Array(5).fill(0).map((_, i) => (
                                   <div className="flex justify-between items-center" key={i}>
                                        <div className="flex items-center gap-2">
                                             <p className="text-base text-black-soft">Chicken</p>
                                        </div>
                                        <span className="text-base text-black-soft font-semibold">+₵20.50</span>
                                   </div>
                              ))}
                         </div>

                         {/* Package Section */}
                         <div className="space-y-4">
                              <h2 className="text-lg text-secondary-light font-bold">Package</h2>

                              {Array(3).fill(0).map((_, i) => (
                                   <div className="flex justify-between items-center" key={i}>
                                        <div className="flex items-center gap-2">
                                             <p className="text-base text-black-soft">Package box cost</p>
                                        </div>
                                        <span className="text-base text-black-soft font-semibold">+₵0.50</span>
                                   </div>

                              ))}
                         </div>
                    </section>

                    <section className="mb-40"></section>
                    </div>

                    {/* Bottom Action Bar */}
                    <section className="fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[88%] bg-transparent py-4 flex justify-between items-center">
                         <div className="w-[38%] h-11 flex justify-center items-center gap-6 bg-primary-pale rounded-full shadow-[0_5px_25px_rgba(0,1,0,0.2)]">
                              <button className="w-6 h-6 flex items-center justify-center bg-primary-main text-white text-md rounded-lg">-</button>
                              <span className="text-md text-primary-main font-bold">1</span>
                              <button className="w-6 h-6 flex items-center justify-center bg-primary-main text-white text-lg rounded-lg pb-0.5">+</button>
                         </div>

                         <button className="w-[55%] h-11 bg-primary-main text-white rounded-full font-bold text-[15px] shadow-[0_5px_25px_rgba(0,1,0,0.2)]">
                              Add to order
                         </button>
                    </section>
               </div>
          </ProductModal>
     );
};

export default ProductPage