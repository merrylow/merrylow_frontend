import { Suspense } from 'react'
import Link from 'next/link'
import BackButton from '@/components/backButton'
import LoadingSpinner from '@/components/loadingSpinner'
import Card from '@/components/card'
import BottomNav from '@/components/bottomNav'
import { Product } from '@/lib/typeDefs'
import { fetchTopProducts } from '@/lib/api'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {
    IoClose
} from "react-icons/io5";
import ProductModal
    from "@/components/productModal";

export const revalidate = 864000

const WhatOthersAreOrderingPage = async () => {
    const topProducts: Product[] = await fetchTopProducts()

    return (
        <main className='w-full flex flex-col items-center gap-6 mb-14'>
            <section className='w-[90%] flex items-center mt-4.5'>
                <div className='flex-1 text-center text-[1.2rem] text-secondary-soft font-bold'>What Others Are Ordering</div>
            </section>

            <section className='fixed flex justify-start items-center w-[90%] md:max-w-[410px] h-10 top-3 left-1/2 -translate-x-1/2'>
                <BackButton />
            </section>

            <section className='w-[90%] flex-1 flex flex-col gap-9 pb-14'>
                <Suspense fallback={<LoadingSpinner />}>
                    {topProducts.map((product: Product, i) => (
                        <div key={i}>
                            <Drawer>
                                <DrawerTrigger
                                    asChild>
                                    <button
                                        className='w-full outline-none border-none'
                                    >
                                        <Card
                                            key={i}
                                            cardClass={'w-full h-58 shrink-0'}
                                            cardDetails={{ imgSrc: product.imageUrl, name: product.name }}
                                        />
                                    </button>
                                </DrawerTrigger>
                                <DrawerContent
                                    className='p-0 max-w-[450px] mx-auto h-[93vh] rounded-t-4xl'>
                                    <DrawerTitle></DrawerTitle>
                                    <DrawerClose
                                        asChild>
                                        <button
                                            className='navigation-btn absolute top-6 right-5 z-50'
                                            aria-label='close modal'
                                        >
                                            <IoClose
                                                className='size-6 fill-gray-pale'/>
                                        </button>
                                    </DrawerClose>

                                    <ProductModal product={product!} />
                                </DrawerContent>
                            </Drawer>
                        </div>
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