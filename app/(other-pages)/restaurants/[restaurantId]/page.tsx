import { FavouriteRestaurantIcon } from '@/components/favouriteIcons'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa'
import { IoAlarm, IoClose, IoEllipsisHorizontal, IoStar, IoTimer } from 'react-icons/io5'
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import ProductModal from '@/components/productModal'
import { MdDeliveryDining, MdLocationPin } from 'react-icons/md'
import { fetchRestaurantsAndProducts } from '@/lib/api'
import { Restaurant, Product } from '@/lib/typeDefs'
import { formatCurrency } from '@/lib/utilFunctions'
import { BiSolidStopwatch } from 'react-icons/bi'

const RestaurantPage = async ({ params }: { params: Promise<{ restaurantId: string, productId: string }> }) => {
    const { restaurantId, productId } = await params
    const { restaurants, products } = await fetchRestaurantsAndProducts()

    // const matchingProduct = products.find((product) => product.id === productId)

    // Find the matching store
    const matchingRestaurant: Restaurant | undefined = restaurants.find((restaurant: Restaurant) => restaurant.id === restaurantId);


    if (!matchingRestaurant) {
        return <div>Restaurant not found</div>
    }


    // drafts a menu
    const menuItems = products.filter(
        (product: Product) => product.restaurant?.id === matchingRestaurant.id
    )

    return (
          <main className='relative w-full h-full min-h-screen relative space-y-5'>
               {/* Restaurant Banner */}
               <section className='w-full h-64 relative rounded-b-3xl overflow-hidden'>
                    <div className="bg-overlay"></div>
                    <Image
                         src={matchingRestaurant.imageUrl}
                         alt="restaurant banner"
                         fill
                         className='object-cover'
                    />
               </section>

               {/* navigation */}
               <section className='absolute flex justify-between items-center w-[88%] h-10 top-5 left-1/2 -translate-x-1/2 z-50'>
                    <Link
                         href='/restaurants'
                         className='navigation-btn'
                         aria-label='back button'
                    >
                         <FaChevronLeft className='size-5 fill-gray-pale' />
                    </Link>

                    {/*<button */}
                    {/*     title='more options' */}
                    {/*     className='navigation-btn'>*/}
                    {/*     <IoEllipsisHorizontal className='size-[1.4rem] fill-gray-pale' />*/}
                    {/*</button>*/}
               </section>

              {/* Title + Favorite */}
               <section className='w-[88%] mx-auto flex flex-col justify-between items-start'>
                    <div className='w-full flex justify-between items-center'>
                         <h1 className='text-xl text-secondary-light font-extrabold'>{matchingRestaurant.name}</h1>
                         {/*<FavouriteRestaurantIcon restaurant={matchingRestaurant} />*/}
                    </div>
                    <p className='text-md text-secondary-soft'>Restaurant slogan...</p>
               </section>


               {/* Quick Info */}
               <section className='w-[88%] mx-auto -mt-1 flex flex-col text-sm font-semibold gap-2.5 text-black-soft'>
                    <div className='flex items-center gap-1'>
                         <MdLocationPin className='icon' /> Restaurant location
                    </div>
                    <div className='flex items-center gap-1'>
                        <BiSolidStopwatch className='icon' /> 40-50min
                    </div>
                    <div className='flex items-center gap-1'>
                         <IoTimer className='icon' /> Open {matchingRestaurant?.startTime?.replace(/\s*:\s*/, ':')} - {matchingRestaurant?.endTime?.replace(/\s*:\s*/, ':')}
                    </div>
               </section>


               {/* Popular items section */}
               <section className='w-[88%] mx-auto mt-9 space-y-3'>
                    <h2 className='text-[1.6rem] font-bold text-secondary-light'>Our Menu</h2>

                    <div className='space-y-3'>
                         {menuItems.map((menuItem, i: number) => {
                             const matchingProduct: Product | undefined = menuItems.find((product: Product) => product.id === menuItem.id)
                             console.log(matchingProduct)

                             return (
                                 <div
                                     key={i}
                                     className='flex border-b border-gray-100 pb-3'>
                                     <div
                                         className='flex-1 self-center space-y-1.5 relative'>
                                         <h3 className='w-[96%] font-semibold text-md text-secondary-soft leading-5'>
                                             {menuItem.name}
                                         </h3>

                                         {/* actual modal */}
                                         <Drawer>
                                             <DrawerTrigger
                                                 asChild>
                                                 <button
                                                     className='text-xs py-1.5 px-6 bg-primary-main text-white see-all-btn'
                                                 >
                                                     Add
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

                                                 <ProductModal product={matchingProduct!} />
                                             </DrawerContent>
                                         </Drawer>

                                         <span
                                             className='text-base text-secondary-soft font-bold ml-2.5 pt-0.5'>
                                                 ₵{formatCurrency(menuItem.price)}
                                         </span>
                                     </div>
                                     <div
                                         className='w-24 h-22 relative rounded-xl overflow-hidden'>
                                         <Image
                                             src={menuItem.imageUrl}
                                             alt={menuItem.name}
                                             fill
                                             className='object-cover'/>
                                     </div>
                                 </div>

                             )
                         })}
                    </div>
               </section>

               <section className='mb-16' />
          </main>
     )
}

export default RestaurantPage