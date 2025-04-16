'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

const QuantitySelector = () => {
     const pathname = usePathname()

     const [quantity, setQuantity] = useState(1)

     const addValue = () => {
          setQuantity(quantity + 1)
     }

     const subtractValue = () => {
          setQuantity(quantity - 1)
     }

     return (
          <div className={pathname === '/cart' 
               ? 'w-[25%] h-9 flex justify-center items-center gap-2.5 bg-primary-pale rounded-full' 
               : 'w-[38%] h-11 flex justify-center items-center gap-5 bg-primary-pale rounded-full shadow-[0_5px_25px_rgba(0,1,0,0.2)]'}
          >
               <button 
                    className={pathname === '/cart' 
                         ? 'w-4.5 h-4.5 flex items-center justify-center bg-primary-main text-white text-md rounded-lg'
                         :'w-6 h-6 flex items-center justify-center bg-primary-main text-white text-md rounded-lg'}
                    onClick={subtractValue}
                    disabled={quantity === 1}
               >
                         -
               </button>
               <span className='text-md text-primary-main font-bold'>
                    {quantity}
               </span>
               <button 
                    className={pathname === '/cart' 
                         ? 'w-4.5 h-4.5 flex items-center justify-center bg-primary-main text-white text-md rounded-lg' 
                         :'w-6 h-6 flex items-center justify-center bg-primary-main text-white text-lg rounded-lg'}
                    onClick={addValue}
               >
                    +
               </button>
          </div>
     )
}

export default QuantitySelector