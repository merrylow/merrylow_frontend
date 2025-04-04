import {
  Carousel,
  CarouselContent,
  // CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel"



const Home = () => {
  const sliderImages = [
    { src: '/slider-images/5-cedis-per-delivery.png', alt: 'image 1' },
    { src: '/slider-images/Free-Delivery.png', alt: 'image 2' },
    { src: '/slider-images/How-to-order.png', alt: 'image 3' }
  ]


  return (
    <main className='w-[93%] mx-auto min-h-screen'> {/* min-h-screen */}


        
        {/* ad carousel */}
        <section className="h-[40%]">
          <Carousel images={sliderImages} opts={{
            align: 'start',
            loop: true,
          }}> 
            <CarouselContent />
          </Carousel>
        </section>


        <section>
        
        </section>

      





    </main>
  )
}


export default Home