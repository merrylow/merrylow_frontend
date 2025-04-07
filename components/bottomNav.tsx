"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { IoFastFood } from "react-icons/io5";
// import { AiFillHome } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { FaCompass, FaUserCircle } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";


const BottomNav = () => {
     const pathname = usePathname(); // Get current URL path

     return (
          <section className="fixed left-1/2 transform -translate-x-1/2 bottom-3 w-[93%] glass h-[4.5em] flex items-center justify-center shadow-2xl  rounded-[20px]">
               <div className="w-full flex justify-between items-center px-4 py-2">
                    <Link
                         href="/"
                         className={`text-base flex flex-col items-center hover:text-primary-light ${
                              pathname === "/" ? "text-primary" : "text-black"
                         }`}
                    >
                         <FaCompass className='size-6' />
                         <span>Discover</span>
                    </Link>

                    <Link
                         href="/restaurants"
                         className={`text-base w-[18%] flex flex-col items-center hover:text-primary-light ${
                              pathname === "/restaurants" ? "text-primary" : "text-black"
                         }`}
                    >
                         {/* <IoFastFood className='w-6 h-6' /> */}
                         <GiChefToque className="size-6" />
                         <span>Restaurants</span>
                    </Link>

                    <Link
                         href="/cart"
                         className={`text-base flex flex-col items-center hover:text-primary-light ${
                              pathname === "/cart" ? "text-primary" : "text-black"
                         }`}
                    >
                         <FaCartShopping className="w-5 h-5" />
                         <span>Cart</span>
                    </Link>

                    <Link
                         href="/profile"
                         className={`text-base flex flex-col items-center hover:text-primary-light ${
                              pathname === "/profile" ? "text-[#a12fda]" : "text-black"
                         }`}
                    >
                         <FaUserCircle className="w-5 h-5" />
                         <span>Profile</span>
                    </Link>
               </div>
          </section>
     );
};

export default BottomNav