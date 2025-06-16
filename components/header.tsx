'use client'
import { FaHouse } from 'react-icons/fa6'
import BetaBadge from '@/components/betaBadge'


const Header = () => {
     return (
          <header className='mx-auto max-w-[450px] w-[90%] h-14 flex justify-between items-center'>
               <div className='flex space-x-2'>
                    <section>
                         <div className='p-[8px] rounded-full bg-[#CB6CE6]'>
                              <FaHouse className='size-[18px] fill-primary-pale' />
                         </div>
                    </section>

                    {/* location */}
                    <section className='flex items-center space-x-0.5 text-base'>
                         {/*<span className='font-semibold'>Home,</span>*/}
                         <span className='pl-0.5'>University of Ghana</span>
                    </section>
               </div>

                <div className='flex items-center'>
                     <BetaBadge />
                     {/*<span className='text-xs text-gray-500 pt-0.5'>v0.9.2</span>*/}
                </div>
          </header>
     )
}

export default Header