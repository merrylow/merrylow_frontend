"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { IoFastFood } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaCompass, FaUserCircle } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";


const BottomNav = () => {
     const pathname = usePathname();

     return (
          <section className="fixed left-1/2 transform -translate-x-1/2 bottom-4 w-[92%] glass h-[4.65em] flex items-center justify-center text-sm shadow-2xl rounded-[20px]">
               <div className="w-full flex justify-between items-center px-4 py-2">
                    <Link
                         href="/"
                         className={`flex flex-col items-center hover:text-primary-light ${
                              pathname === "/" ? "text-primary-main" : "text-black-light"
                         }`}
                    >
                         <FaCompass className='size-5' />
                         <span>Discover</span>
                    </Link>

                    <Link
                         href="/restaurants"
                         className={`w-[16%] flex flex-col items-center hover:text-primary-light ${
                              pathname === "/restaurants" ? "text-primary-main" : "text-black-light"
                         }`}
                    >
                         {/* <IoFastFood className='w-6 h-6' /> */}
                         <GiChefToque className="size-5" />
                         <span className="tracking-tight">Restaurants</span>
                    </Link>

                    <Link
                         href="/cart"
                         className={`flex flex-col items-center hover:text-primary-light ${
                              pathname === "/cart" ? "text-primary-main" : "text-black-light"
                         }`}
                    >
                         <FaCartShopping className="size-5" />
                         <span>Cart</span>
                    </Link>

                    <Link
                         href="/profile"
                         className={`flex flex-col items-center hover:text-primary-light ${
                              pathname === "/profile" ? "text-primary-main" : "text-black-light"
                         }`}
                    >
                         <FaUserCircle className="size-5" />
                         <span>Profile</span>
                    </Link>
               </div>
          </section>
     );
};

export default BottomNav