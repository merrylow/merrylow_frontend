import Link from 'next/link'
import Card from '@/components/card'
import LoadingSpinner from '@/components/loadingSpinner'
import { fetchRestaurantsAndProducts } from '@/lib/api'
import { Suspense } from 'react'
import { Restaurant } from '@/lib/typeDefs'


export const revalidate = 864000

const RestaurantsPage = async () => {
    const { restaurants } = await fetchRestaurantsAndProducts()

     return (
          <main className='flex flex-col items-center space-y-5'>
               <section className='w-[90%]'>
                    <h1 className='page-heading text-xl font-bold text-secondary-soft -mt-1'>Restaurants</h1>
               </section>

               <section className='w-[90%] pb-26'>
                    <h2 className='tracking-wide text-lg font-bold mb-1.5'>All restaurants</h2>

                    <div className='flex flex-col gap-9'> {/* h-[169rem] */}
                        <Suspense fallback={<LoadingSpinner />}>
                             {restaurants.map((restaurant: Restaurant) => (
                                  <Link
                                      href={`/restaurants/${restaurant.id}`}
                                      className='w-full block'
                                      key={restaurant.id}
                                  >
                                       <Card
                                            cardClass='w-full h-56' //h-[14.6rem]
                                            cardDetails={{
                                                 imgSrc: restaurant.imageUrl || '/Yam and palava sauce-marg-tee.jpg',
                                                 name: restaurant.name,
                                            }}
                                       />
                                  </Link>
                             ))}
                        </Suspense>
                    </div>
               </section>
          </main>
     )
}

export default RestaurantsPage