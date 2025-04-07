import {
     Carousel,
     CarouselContent,
     CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel"



const AdCarousel = () => {
     const sliderImages = [
          { src: '/slider-images/5-cedis-per-delivery.png', alt: 'image 1' },
          { src: '/slider-images/Free-Delivery.png', alt: 'image 2' },
          { src: '/slider-images/How-to-order.png', alt: 'image 3' }
     ]

     return (
          <>
               <Carousel images={sliderImages} opts={{
                    align: 'start',
                    loop: true,
               }}> 
                    <CarouselContent>
                         <CarouselItem />
                    </CarouselContent>
               </Carousel>
          </>
     )
}

export default AdCarousel