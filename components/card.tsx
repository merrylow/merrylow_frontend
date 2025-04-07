import { Timer } from "lucide-react"
import { CardDetails } from "@/global"
import Image from "next/image"
import { IoTimer } from "react-icons/io5"


const Card = ({ cardClass, cardDetails }: {
     cardClass: string, 
     cardDetails: CardDetails
}) => {
     return (
          <div className={`card shadow-[0_4px_10px_rgba(0,0,0,0.2)] snap-center h-full rounded-[10px] ${cardClass}`}>
               <figure className="relative w-full h-[63%] rounded-t-[10px]">
                    <Image
                         src={cardDetails.imgSrc}
                         className="object-cover rounded-t-[10px]"
                         alt="Sh"
                         fill
                    />
               </figure>
               <div className="h-[37%] card-body flex flex-1 flex-col justify-center rounded-b-[10px] px-5">
                    <h3 className="card-title">{cardDetails.mealName}</h3>
                    <p className="text-[14px] card-description">{cardDetails.mealDescription}</p>

                    <div>
                         <IoTimer className="size-5 fill-primary-main" />
                    </div>
               </div>
          </div>
     )
}

export default Card