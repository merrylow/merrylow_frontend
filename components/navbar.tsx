'use client'
import { FaHouse } from 'react-icons/fa6'


const Navbar = () => {
     return (
          <header className="mx-auto w-[93%] h-16 flex items-center">
               <div className="flex space-x-2">
                    <section>
                         <div className="p-[8px] rounded-full bg-[#CB6CE6]">
                              {/* <House className="size-5 stroke-primary-pale" /> */}
                              <FaHouse className='size-[18px] fill-primary-pale' />
                         </div>
                    </section>

                    {/* location */}
                    <section className="flex items-center space-x-0.5">
                         <span className="font-semibold">Home,</span>
                         <span className="pl-0.5">University of Ghana</span>
                    </section>
               </div>
          </header>
     )
}

export default Navbar