import Link from "next/link"
import Card from "@/components/card"
import fetchRestaurantsAndProducts from '@/lib/api'


// wrap in suspense

const RestaurantsPage = async () => {
    const { restaurants } = await fetchRestaurantsAndProducts()
    // console.log(restaurants)

     return (
          <main className="min-h-screen flex flex-col items-center space-y-5">
               <section className="w-[90%]">
                    <h1 className="page-heading text-xl font-bold text-secondary-soft -mt-1">Restaurants</h1>
               </section>

               <section className="w-[90%] h-[80%]">
                    <h2 className="tracking-wide text-lg font-bold mb-1.5">All restaurants</h2>

                    <div className="h-[160rem] flex flex-col gap-9">
                         {restaurants.map((restaurant) => (
                              <Link href={`/restaurants/${restaurant.id}`} className="w-full" key={restaurant.id}>
                                   <Card
                                        cardClass="w-full h-[14.6rem]"
                                        cardDetails={{
                                             imgSrc: '/Yam and palava sauce-marg-tee.jpg',
                                             name: restaurant.name,
                                        }}
                                   />
                              </Link>
                         ))}
                    </div>
               </section>

               <div className="mb-20" />
          </main>
     )
}

export default RestaurantsPage