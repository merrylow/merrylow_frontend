import {
     Carousel,
     CarouselContent,
     CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel"



const AdCarousel = () => {
     const sliderImages = [
          { src: '/merrylow.png', alt: '' },
          // { src: '/slider-images/Free-Delivery.png', alt: '' },
          // { src: '/slider-images/How-to-order.png', alt: '' }
     ]

     return (
          <>
               <Carousel images={sliderImages} opts={{
                    align: 'start',
                    loop: true,
                    }}
               >
                    <CarouselContent>
                         <CarouselItem />
                    </CarouselContent>
               </Carousel>
          </>
     )
}

export default AdCarousel