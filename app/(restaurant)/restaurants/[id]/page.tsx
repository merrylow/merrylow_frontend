import { LucideAlarmCheck, LucideAlarmClock } from "lucide-react";
import Image from "next/image";
import { GiAlarmClock } from "react-icons/gi";
import { IoAlarm, IoHeartOutline, IoStar, IoTimer } from "react-icons/io5";

const menu = [
     {
          id: 1,
          name: "Jollof rice",
          description: "jollof-rice-marg-tee",
          price: "₵29.50",
          imgSrc: "/jollof-rice-marg-tee-1094739000-612x612.jpg",
     },
     {
     id: 2,
          name: "Yam and palava sauce",
          description: "Yam and palava sauce-marg-tee",
          price: "₵9.50",
          imgSrc: "/Yam and palava sauce-marg-tee.jpg",
     },
     {
          id: 3,
          name: "Jollof rice",
          description: "jollof-rice-marg-tee",
          price: "₵29.00",
          imgSrc: "/jollof-rice-marg-tee-1094739000-612x612.jpg",
     },
     {
          id: 4,
          name: "Yam and palava sauce",
          description: "Yam and palava sauce-marg-tee",
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
];

const RestaurantPage = ({ params }: { params: Promise<{ id: string }> }) => {
     return (
          <main className='w-full h-full min-h-screen space-y-5'>
               {/* Restaurant Banner */}
               <section className='w-full h-72 relative overflow-hidden'>
                    <Image
                         src='/Yam and palava sauce-marg-tee.jpg'
                         alt="restaurant banner"
                         fill
                         className='object-cover'
                    />
               </section>
              {/* Title + Favorite */}
               <section className='w-[88%] mx-auto flex flex-col justify-between items-start'>
                    <div className='w-full flex justify-between items-center'>
                         <h1 className='text-xl text-secondary-light font-extrabold'>Restaurant name</h1>
                         <IoHeartOutline className='size-8' />
                    </div>
                    <p className='text-md text-secondary-soft'>Restaurant slogan...</p>
               </section>

               {/* Quick Info */}
               <section className='w-[88%] mx-auto flex flex-col text-base font-semibold gap-2.5 text-black-pale'>
                    <div className='flex items-center gap-1'>
                         <IoStar className='icon' /> Excellent 4.5
                    </div>
                    <div className='flex items-center gap-1'>
                         {/* <span className='inline-flex gap-1'> */}
                              <IoAlarm className='icon' /> 40-50min
                         {/* </span> */}
                         {/* <button className='bg-secondary-light text-gray-pale text-xs py-2 see-all-btn'>Change</button> */}
                    </div>
                    <div className='flex items-center gap-1'>
                         <IoTimer className='icon' /> Open 10:00 - 22:00
                    </div>
               </section>

               {/* Popular items section */}
               <section className='w-[88%] mx-auto mt-9 space-y-3'>
                    <h2 className='text-[1.6rem] font-bold'>Our Menu</h2>

                    <div className='space-y-5'>
                         {menu.map((item, i) => (
                              <div key={item.id} className='flex'>
                                   <div className='flex-1 self-center space-y-1'>
                                        <h3 className='font-semibold text-md'>{item.name}</h3>
                                        <p className='text-[13.5px] text-black-pale'>{item.description}</p>
                                        <button title="add to cart" className="bg-secondary-light text-gray-pale text-[12.5px] py-1 see-all-btn">Add</button>
                                        <span className="text-sm text-secondary-soft ml-2.5 self-center">{item.price}</span>
                                   </div>
                                   <div className='size-24 relative rounded-xl overflow-hidden'>
                                        <Image src={item.imgSrc} alt={item.name} fill className='object-cover' />
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