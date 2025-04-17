'use client'

import { usePathname, useRouter } from "next/navigation"
import { FaChevronLeft } from "react-icons/fa"

const BackButton = () => {
     const pathname = usePathname()
     const router = useRouter()

     return (
          <button
               onClick={() => router.back()}
               className={pathname === '/cart' 
                    ? 'text-black'
                    : 'navigation-btn'}
                    title='back button'
               aria-label='back button'
          >
               <FaChevronLeft className={pathname === '/cart' 
                    ? 'size-5 text-seconday-soft'
                    : 'size-[1.1rem] fill-gray-pale'}
               />
          </button>
     )
}

export default BackButton