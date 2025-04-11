'use client'

import { CardDetails } from "@/global"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { IoTimer } from "react-icons/io5"


const Card = ({ cardClass, cardDetails }: {
     cardClass: string, 
     cardDetails: CardDetails
}) => {
     const { imgSrc, mealName, mealDescription } = cardDetails;
     const pathname = usePathname()

     return (
          <div className={`card shadow-[0_4px_10px_rgba(0,0,0,0.2)] snap-center h-full rounded-[15px] ${cardClass}`}>
               <figure className={
                    pathname === '/'
                    ? 'relative w-full h-[63%] rounded-t-[15px]'
                    : 'relative w-full h-[70%] rounded-t-[15px]'
               }>
                    <Image
                         src={imgSrc}
                         className="object-cover rounded-t-[10px]"
                         alt="Sh"
                         fill
                    />
               </figure>
               <div className={
                    pathname === '/' 
                    ? 'h-[35%] card-body flex flex-1 flex-col justify-center gap-[0.01rem] rounded-b-[15px] px-6'
                    : 'h-[30%] card-body flex flex-1 flex-col justify-center gap-[0.1rem] rounded-b-[15px] px-6' 
               }>
                    <h3 className={
                         pathname === '/'
                         ? 'card-title'
                         : 'text-md font-bold text-secondary-soft'
                    }>{mealName}</h3>
                    <p className={
                         pathname === '/'
                         ? 'card-description'
                         : 'text-sm text-black-pale' 
                    }>{mealDescription}</p>

                    <span>
                         <IoTimer className="size-5 fill-primary-light" />
                    </span>
               </div>
          </div>
     )
}

export default Card