// import Image from "next/image"

const RestaurantPage = async ({ params }: { params: Promise<{ id: string }> }) => {
     // const { id } = await params

     return (
          // <div>Restaurant {id}</div>
          <main className='w-full flex flex-col'>
               {/* restaurant banner image */}
               <section className='h-[35%] border-2 border-red-500'>
                    {/* <Image 
                         src={'/merrylow.png'}
                         // className='w-full h-full object-cover'
                         width={150}
                         height={150}
                         alt="restaurant banner image"
                    /> */}
                    jjjj
               </section>

               <section className='h-[65%] border-2'>
                    <div>
bbb
                    </div>

                    {/* menu */}
                    <div>

                    </div>
               </section>
          </main>
     )
}

export default RestaurantPage