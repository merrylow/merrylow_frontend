'use client'

import { CardDetails } from '@/lib/typeDefs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { MdDeliveryDining } from 'react-icons/md'
import { BiSolidStopwatch } from 'react-icons/bi'
import clsx from 'clsx'


const Card = ({ cardClass, cardDetails }: {
     cardClass: string, 
     cardDetails: CardDetails
}) => {
     const { imgSrc, name } = cardDetails;
     const pathname = usePathname()

     return (
          <div className={`card shadow-[0_4px_10px_rgba(0,0,0,0.2)] snap-center rounded-[15px] overflow-hidden whitespace-nowrap text-ellipsis ${cardClass}`}>
               <figure className={clsx('relative w-full rounded-t-[15px]', {'h-[65%]': pathname === '/', 'h-[70%]': pathname === '/restaurants'})}
               >
                    <Image
                         src={imgSrc}
                         className='object-cover rounded-t-[15px]'
                         alt=''
                         fill
                    />
               </figure>
               <div className={clsx('card-body flex flex-1 flex-col justify-center rounded-b-[15px] space-y-0.5', {'h-[35%] gap=[0.01rem] px-5': pathname === '/', 'h-[30%] gap-[0.05rem] px-6': pathname === '/restaurants'})}>
                    <h3 className={
                         pathname === '/'
                         ? 'card-title'
                         : 'text-[1rem] font-semibold text-secondary-soft'
                    }>{name}</h3>

                    <div className='flex items-center space-x-2.5'>
                        <span className='flex items-center space-x-1'>
                            <MdDeliveryDining className='size-6 fill-primary-main/70' />
                            <s className='text-gray-400 font-semibold text-sm'>₵0.00</s>
                        </span>
                        <span className='flex items-center text-xs text-secondary-soft space-x-0.5'>
                            <BiSolidStopwatch className='size-5 fill-primary-main/70' />
                            <p className='text-sm pt-0.5'>40-50min</p>
                        </span>
                    </div>
               </div>
          </div>
     )
}

export default Card