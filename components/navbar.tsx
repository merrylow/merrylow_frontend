'use client'
import { HouseIcon } from "lucide-react"
import Link from "next/link"


const Navbar = () => {
     return (
          <header className="mx-auto w-[93%] h-16 flex items-center">
               <div className="flex space-x-2">
                    <section>
                         <div className="p-1.5 rounded-full bg-primary">
                              <HouseIcon className="rounded-full fill-primary-pale stroke-transparent size-5" />
                         </div>
                    </section>

                    {/* location */}
                    <section className="flex items-center space-x-0.5">
                         <span className="font-semibold">Home,</span>
                         <span>University of Ghana</span>
                    </section>
               </div>
          </header>
     )
}

export default Navbar