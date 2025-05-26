import AdCarousel from '@/components/adCarousel'
import Link from 'next/link'
import Card from '@/components/card'
import Greeting from '@/components/greeting'
import { fetchTopRestaurants, fetchTopProducts } from '@/lib/api'
import { Product, Restaurant } from '@/lib/typeDefs'

export const revalidate = 864000

const Home = async () => {
    const topRestaurants: Restaurant[] = await fetchTopRestaurants()
    const topProducts: Product[] = await fetchTopProducts()

    return (
        <main className='w-full mx-auto min-h-screen space-y-10
        '>
            <section className='w-[90%] mx-auto'>
                <Greeting />
            </section>
            {/* ad carousel */}
            <section className="w-[90%] h-[15rem] min-h-[15rem] mx-auto mb-12 rounded-[18px]">
                <AdCarousel />
            </section>




            {/* what people are ordering */}
            <section className='card-section'>
                <div className='w-[90%] h-[14%] mx-auto flex justify-between items-center'>
                    <h1 className='font-bold text-secondary-light text-[1.14rem]'>What others are ordering🔥</h1>

                    <Link href='/see-all/what-others-are-ordering' className='see-all-btn px-5'>See all</Link>
                </div>

                <Link href='/see-all/what-others-are-ordering' className='slider-container'>
                    <div className="shrink-0 w-[0.5px] ml-[-9px] snap-start" />

                    {topProducts.map((product: Product, i) => (
                      <Card
                        key={i}
                        cardClass={'w-[271px] h-full shrink-0'}
                        cardDetails={{ imgSrc: product.imageUrl, name: product.name }}  />
                    ))}
                </Link>
            </section>


            {/* top vendors */}
            <section className='card-section'>
                <div className='w-[90%] h-[18%] mx-auto flex justify-between items-center'>
                    <h1 className='section-heading'>Top vendors👏</h1>

                    <Link href='/see-all/top-restaurants' className='see-all-btn'>See all</Link>
                </div>

                <Link href='/see-all/top-restaurants' className='slider-container'>
                    <div className='shrink-0 w-[0.5px] ml-[-9px] snap-start' />

                    {topRestaurants.map((restaurant: Restaurant , i) => (
                      <Card
                        key={i}
                        cardClass={'w-[190px] h-45 shrink-0'}
                        cardDetails={{ imgSrc: restaurant.imageUrl, name: restaurant.name }}
                      />
                    ))}
                </Link>
            </section>


            {/* recently viewed */}
            {/*<section className="card-section">*/}
            {/*  <div className='w-[90%] h-[14%] mx-auto flex justify-between items-center'>*/}
            {/*    <h1 className='section-heading'>Recently viewed</h1>*/}

            {/*    <Link href='/see-all/recently-viewed' className='see-all-btn'>See all</Link>*/}
            {/*  </div>*/}

            {/*  <div className="slider-container">*/}
            {/*    <div className="shrink-0 w-[0.5px] ml-[-10px] snap-start" />*/}

            {/*    {Array(6).fill(0).map((_, i) => (*/}
            {/*      <Card*/}
            {/*        key={i}*/}
            {/*        cardClass={'w-[280px] h-full shrink-0'}*/}
            {/*        cardDetails={{ imgSrc: '/jollof-rice-marg-tee-1094739000-612x612.jpg', name: 'Meal namee' }} />*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</section>*/}

            <section className='mb-20'></section>
        </main>
    )
}


export default Home