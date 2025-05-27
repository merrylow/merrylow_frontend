import { Suspense } from 'react'
import BackButton from '@/components/backButton'
import { fetchTopRestaurants } from '@/lib/api'
import Card from '@/components/card'
import BottomNav from '@/components/bottomNav'
import LoadingSpinner from '@/components/loadingSpinner'
import Link from 'next/link'
import { Restaurant } from '@/lib/typeDefs'

export const revalidate = 864000

const TopRestaurantsPage = async () => {
    const topRestaurants: Restaurant[] = await fetchTopRestaurants()

    return (
        <main className='w-full flex flex-col items-center gap-6 mb-14'>
            <section className='w-[90%] flex items-center mt-4.5'>
                <div className='flex-1 text-center text-[1.2rem] text-secondary-soft font-bold'>Top Vendors</div>
            </section>

            <section className='fixed flex justify-start items-center w-[90%] md:max-w-[412px] h-10 top-3 left-1/2 -translate-x-1/2'>
                <BackButton />
            </section>

            <section className='w-[90%] flex flex-col gap-9 pb-14'> {/* flex-1 */}
                <Suspense fallback={<LoadingSpinner />}>
                    {topRestaurants.map((restaurant: Restaurant) => (
                        <Link
                            key={restaurant.id}
                            // id={restaurant.id
                            href={`/restaurants/${restaurant.id}`}
                            className='w-full block'
                        >
                            <Card
                                cardClass={'w-full h-58'}
                                cardDetails={{
                                    imgSrc: restaurant.imageUrl,
                                    name: restaurant.name,
                                }}
                            />
                        </Link>
                    ))}
                </Suspense>
            </section>
            
            <section>
                <BottomNav />
            </section>
        </main>
    )
}

export default TopRestaurantsPage
                    // <Card
                    //     name={restaurant.name}
                    //     imageUrl={restaurant.imageUrl}
                    //     rating={restaurant.rating}
                    //     orderCount={restaurant._count?.orderItem}
                    //     cuisineType={restaurant.cuisineType}
                    // />
