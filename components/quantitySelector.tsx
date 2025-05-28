'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

type quantitySelectorProps = {
     quantity: number;
     setQuantity: (quantity: number) => void;
}

const QuantitySelector = ({ quantity, setQuantity }: quantitySelectorProps) => {
     const pathname = usePathname()

     // const [quantity, setQuantity] = useState(1)

     const addValue = () => {
          setQuantity(quantity + 1)
     }

     const subtractValue = () => {
          setQuantity(quantity - 1)
     }

     return (
          <div className={pathname === '/cart' 
               ? 'w-[24%] h-8 flex justify-center items-center gap-2.5 bg-primary-pale rounded-full'
               : 'w-[38%] h-10 flex justify-center items-center gap-5 bg-primary-pale rounded-full shadow-[0_5px_25px_rgba(0,1,0,0.2)]'}
          >
               <button 
                    className={pathname === '/cart' 
                         ? 'w-[1.13rem] h-[1.13rem] flex items-center justify-center bg-primary-main text-white text-md rounded-md'
                         :'w-5 h-5 flex items-center justify-center bg-primary-main text-white text-md rounded-md'}
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
                         ? 'w-[1.13rem] h-[1.13rem] flex items-center justify-center bg-primary-main text-white text-md rounded-md'
                         :'w-5 h-5 flex items-center justify-center bg-primary-main text-white text-lg rounded-md'}
                    onClick={addValue}
               >
                    +
               </button>
          </div>
     )
}

export default QuantitySelector