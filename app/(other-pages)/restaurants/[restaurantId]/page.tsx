import FavouriteIcon from "@/components/favouriteIcon"
import Image from "next/image"
import Link from 'next/link'
import { FaChevronLeft } from "react-icons/fa"
import { IoAlarm, IoEllipsisHorizontal, IoHeartOutline, IoStar, IoTimer } from "react-icons/io5"


const menu = [
     {
          id: 1,
          name: "Jollof rice",
          description: "jollof-rice-marg-tee...",
          price: "₵29.50",
          imgSrc: "/jollof-rice-marg-tee-1094739000-612x612.jpg",
     },
     {
     id: 2,
          name: "Yam and palava sauce",
          description: "Yam and palava sauce-marg-tee...",
          price: "₵9.50",
          imgSrc: "/Yam and palava sauce-marg-tee.jpg",
     },
     {
          id: 3,
          name: "Jollof rice",
          description: "jollof-rice-marg-tee...",
          price: "₵29.00",
          imgSrc: "/jollof-rice-marg-tee-1094739000-612x612.jpg",
     },
     {
          id: 4,
          name: "Yam and palava sauce",
          description: "Yam and palava sauce-marg-tee...",
          price: "€9.50",
          imgSrc: "/Yam and palava sauce-marg-tee.jpg",
     },
     {
          id: 5,
          name: "Jollof rice",
          description: "jollof-rice-marg-tee",
          price: "₵29.00",
          imgSrc: "/jollof-rice-marg-tee-1094739000-612x612.jpg",
     },
]




const RestaurantPage = async ({ params }: { params: Promise<{ restaurantId: string, productId: string }> }) => {
     const { restaurantId, productId } = await params

     return (
          <main className='w-full h-full min-h-screen relative space-y-5'>
               {/* Restaurant Banner */}
               <section className='w-full h-64 relative rounded-b-3xl overflow-hidden'>
                    <div className="bg-overlay"></div>
                    <Image
                         src='/Yam and palava sauce-marg-tee.jpg'
                         alt="restaurant banner"
                         fill
                         className='object-cover'
                    />
               </section>

               {/* navigation */}
               <section className='absolute flex justify-between items-center w-[88%] h-10 top-5 left-1/2 -translate-x-1/2'>
                    <Link
                         href='/restaurants'
                         className='w-[2.35rem] h-[2.35rem] flex items-center justify-center rounded-full backdrop-blur-md bg-black/60 shadow-[2px_5px_11px_rgba(0,1,0,0.45)] transition-all z-50'>
                         <FaChevronLeft className='size-5 fill-gray-pale' />
                    </Link>

                    <button 
                         title='more options' 
                         className='w-[2.35rem] h-[2.35rem] flex items-center justify-center rounded-full backdrop-blur-md bg-black/60 shadow-[2px_5px_11px_rgba(0,1,0,0.45)] transition-all'
                         aria-label='more options button z-50'>
                         <IoEllipsisHorizontal className='size-6 fill-gray-pale' />
                    </button>
               </section>

              {/* Title + Favorite */}
               <section className='w-[88%] mx-auto flex flex-col justify-between items-start'>
                    <div className='w-full flex justify-between items-center'>
                         <h1 className='text-xl text-secondary-light font-extrabold'>Restaurant name</h1>
                         <FavouriteIcon />
                    </div>
                    <p className='text-md text-secondary-soft'>Restaurant slogan...</p>
               </section>


               {/* Quick Info */}
               <section className='w-[88%] mx-auto flex flex-col text-sm font-semibold gap-2.5 text-black-soft'>
                    <div className='flex items-center gap-1'>
                         <IoStar className='icon' /> Excellent 4.5
                    </div>
                    <div className='flex items-center gap-1'>
                         <IoAlarm className='icon' /> 40-50min
                    </div>
                    <div className='flex items-center gap-1'>
                         <IoTimer className='icon' /> Open 10:00 - 22:00
                    </div>
               </section>


               {/* Popular items section */}
               <section className='w-[88%] mx-auto mt-9 space-y-3'>
                    <h2 className='text-[1.6rem] font-bold text-secondary-light'>Our Menu</h2>

                    <div className='space-y-5'>
                         {menu.map((item, i) => (
                              <div key={item.id} className='flex'>
                                   <div className='flex-1 self-center space-y-1'>
                                        <h3 className='font-semibold text-md text-secondary-light'>
                                             {item.name}
                                        </h3>
                                        <p className='text-[13.5px] text-black-pale'>
                                             {item.description}
                                        </p>
                                        <Link href={`/restaurants/${restaurantId}/product/${productId}`} className="text-xs py-1.5 bg-primary-main text-white see-all-btn">
                                             Add
                                        </Link>
                                        <span className="text-base text-secondary-soft font-semibold ml-2.5 self-end">
                                             {item.price}
                                        </span>
                                   </div>
                                   <div className='size-24 relative rounded-xl overflow-hidden'>
                                        <Image 
                                             src={item.imgSrc} 
                                             alt={item.name} 
                                             fill 
                                             className='object-cover' />
                                   </div>
                              </div>
                         ))}
                    </div>
               </section>

               <section className='mb-20' />
          </main>
     );
};

export default RestaurantPage;