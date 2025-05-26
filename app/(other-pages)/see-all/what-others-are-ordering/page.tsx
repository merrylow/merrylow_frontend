import { Suspense } from 'react'
import Link from 'next/link'
import BackButton from '@/components/backButton'
import LoadingSpinner from '@/components/loadingSpinner'
import Card from '@/components/card'
import BottomNav from '@/components/bottomNav'
import { Product } from '@/lib/typeDefs'
import { fetchTopProducts } from '@/lib/api'

export const revalidate = 864000

const WhatOthersAreOrderingPage = async () => {
    const topProducts: Product[] = await fetchTopProducts()

    return (
        <main className='w-full flex flex-col items-center gap-6 mb-14'>
            <section className='w-[90%] flex items-center mt-4'>
                <div className='flex-1 text-center text-lg text-secondary-soft font-bold'>What Others Are Ordering</div>
            </section>

            <section className='fixed flex justify-start items-center w-[90%] md:max-w-[410px] h-10 top-3 left-1/2 -translate-x-1/2'>
                <BackButton />
            </section>

            <section className='w-[90%] flex-1 flex flex-col gap-9 pb-14'>
                <Suspense fallback={<LoadingSpinner />}>
                    {topProducts.map((product: Product) => (
                        <Link
                            // id={product.id}
                            key={product.id}
                            href={`/products/${product.id}`}
                            className='w-full block'
                        >
                            <Card
                                cardClass='w-full h-56' //h-[14.6rem]
                                cardDetails={{
                                    imgSrc: product.imageUrl,
                                    name: product.name,
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

export default WhatOthersAreOrderingPage