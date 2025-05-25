'use client'

import { useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from '@/components/ui/drawer'
import AuthCheckModal from '@/components/authCheckModal'
import { IoClose } from 'react-icons/io5'
import ProductModal from '@/components/productModal'
import { formatCurrency } from '@/lib/utilFunctions'
import { Product } from '@/lib/typeDefs'
import Image from 'next/image'

const RestaurantMenuClient = ({ menuItems }: { menuItems: Product[] }) => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

    return (
        <div className='space-y-3'>
            {menuItems.map((menuItem, i: number) => (
                <div key={i} className='flex border-b border-gray-100 pb-3'>
                    <div className='flex-1 self-center space-y-1.5 relative'>
                        <h3 className='w-[96%] font-semibold text-md text-secondary-soft leading-5'>
                            {menuItem.name}
                        </h3>
                        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                            {/*<DrawerTrigger asChild>*/}
                            {/*     <button*/}
                            {/*         className='text-xs py-1.5 px-6 bg-primary-main text-white see-all-btn'*/}
                            {/*     >*/}
                            {/*          Add*/}
                            {/*     </button>*/}

                            {/*</DrawerTrigger>*/}
                            {/*<DrawerContent className='p-0 max-w-full h-[93vh] rounded-t-4xl'>*/}
                            {/*     <DrawerTitle></DrawerTitle>*/}
                            {/*     <DrawerClose asChild>*/}
                            {/*          <button*/}
                            {/*              className='navigation-btn absolute top-6 right-5 z-50'*/}
                            {/*              aria-label='close modal'*/}
                            {/*          >*/}
                            {/*               <IoClose className='size-6 fill-gray-pale' />*/}
                            {/*          </button>*/}
                            {/*     </DrawerClose>*/}
                            {/*     <ProductModal productId={menuItem.id} />*/}
                            {/*</DrawerContent>*/}
                            <AuthCheckModal  onAuthenticated={() => {
                                setSelectedProductId(menuItem.id)
                                setDrawerOpen(true)
                            }}>
                                <button className='text-xs py-1.5 px-6 bg-primary-main text-white see-all-btn'>
                                    Add
                                </button>
                            </AuthCheckModal>
                            <DrawerContent className='p-0 max-w-full h-[93vh] rounded-t-4xl'>
                                <DrawerTitle></DrawerTitle>
                                <DrawerClose asChild>
                                    <button className='navigation-btn absolute top-6 right-5 z-50'>
                                        <IoClose className='size-6 fill-gray-pale' />
                                    </button>
                                </DrawerClose>
                                {selectedProductId && (
                                    <ProductModal productId={selectedProductId} />
                                )}
                            </DrawerContent>
                        </Drawer>
                        <span className='text-base text-secondary-soft font-bold ml-2.5 pt-0.5'>
                            ₵{formatCurrency(menuItem.price)}
                        </span>
                    </div>
                    <div className='w-24 h-22 relative rounded-xl overflow-hidden'>
                        <Image
                            src='/Yam and palava sauce-marg-tee.jpg'
                            alt={menuItem.name}
                            fill
                            className='object-cover' />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default RestaurantMenuClient