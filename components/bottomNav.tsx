'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaCartShopping } from 'react-icons/fa6'
import { FaCompass, FaUserCircle } from 'react-icons/fa'
import { GiChefToque } from 'react-icons/gi'
// import { IoFastFood } from 'react-icons/io5'

const BottomNav = () => {
     const pathname = usePathname()

     return (
         <section className='fixed left-1/2 transform -translate-x-1/2 bottom-4 w-[94%] max-w-[450px] glass h-[4.8em] flex items-center justify-center text-sm shadow-[0_5px_25px_rgba(0,1,0,0.2)] rounded-[22px]'>
              <div className='w-full flex justify-between items-center px-4 py-3'>
                   <Link
                       href='/'
                       className={`flex flex-col items-center hover:text-primary-light gap-1 ${
                           pathname === '/' ? 'text-primary-main' : 'text-secondary-soft'
                       }`}
                   >
                        <FaCompass className='size-5' />
                        <span>Discover</span>
                   </Link>

                   <Link
                       href='/restaurants'
                       className={`w-[16%] flex flex-col items-center hover:text-primary-light gap-1 ${
                           pathname === '/restaurants' ? 'text-primary-main' : 'text-secondary-soft'
                       }`}
                   >
                         {/*<IoFastFood className='size-5' />*/}
                        <GiChefToque className='size-5' />
                        <span className='tracking-tight'>Restaurants</span>
                   </Link>

                   <Link
                       href='/cart'
                       className={`flex flex-col items-center hover:text-primary-light gap-1 ${
                           pathname === '/cart' ? 'text-primary-main' : 'text-secondary-soft'
                       }`}
                   >
                        <FaCartShopping className='size-5' />
                        <span>Cart</span>
                   </Link>

                   <Link
                       href='/profile'
                       className={`flex flex-col items-center hover:text-primary-light gap-1 ${
                           pathname === '/profile' ? 'text-primary-main' : 'text-secondary-soft'
                       }`}
                   >
                        <FaUserCircle className='size-5' />
                        <span>Profile</span>
                   </Link>
              </div>
         </section>
     )
}

export default BottomNav