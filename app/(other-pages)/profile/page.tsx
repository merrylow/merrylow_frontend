'use client'

import BottomNav from '@/components/bottomNav'
import { FaUser, FaUserCircle, FaShoppingBag, FaHourglassHalf, FaMapMarkerAlt, FaCreditCard, FaEnvelope, FaCog, FaQuestionCircle } from 'react-icons/fa'
import Link from 'next/link'
import { SignOutButton } from '@/components/authButtons'
import { IoHeart } from 'react-icons/io5'
import Image from 'next/image'
import useUserStore from '@/stores/useUserStore'
import { useRouter } from 'next/navigation'
import SignInPage from '@/app/(other-pages)/auth/sign-in/page'


export const dynamic = 'force-dynamic'

const ProfilePage = () => {
     const router = useRouter()
     const user = useUserStore(state => state.user)
     const isAuthenticated = useUserStore(state => state.isAuthenticated)

     if(!user) router.push('/auth/sign-in')

     if (user && isAuthenticated) {
          return (
              <main
                  className='min-h-screen w-full flex flex-col justify-around items-center'>
                   <div className='w-[88%] flex flex-col gap-11 mt-3'>
                        <section className='flex space-x-3'>
                             <div className='relative size-16 rounded-full overflow-hidden'>
                                   { isAuthenticated ? (
                                       <Image
                                           className='rounded-full ovject-cover'
                                           src={`${user?.imgUrl}`}
                                           fill
                                           alt=''
                                       />
                                   ) : (
                                        <FaUserCircle className='text-secondary-pale size-16' />
                                   )}
                             </div>
                             <div className='flex flex-col justify-center -space-y-1'>
                                  <h2 className='text-lg font-bold text-black'>{user?.name}</h2>
                                  <p className='text-sm text-gray-500'>{user?.email}</p>
                             </div>
                        </section>

                        {/* Menu Items */}
                        <section
                            className='flex flex-col items-start space-y-6'>
                            {/*<Link*/}
                            {/*   //  href='#'*/}
                            {/*  //   className='flex items-center space-x-4 text-black'>*/}
                            {/*   //   <FaUser*/}
                            {/*    //      className='text-primary-main size-6'/>*/}
                            {/*    //  <span*/}
                            {/*     //     className='font-medium text-base'>My profile</span>*/}
                            {/* // </Link>*/}

                            <Link
                                 href='/checkout'
                                 className='flex items-center space-x-4 text-black'>
                                  <FaHourglassHalf
                                      className='text-primary-main size-6'/>
                                  <span
                                      className='font-medium text-base'>My orders</span>
                            </Link>

                             {/*<Link*/}
                             {/*    href='/'*/}
                             {/*    className='flex items-center space-x-4 text-black'>*/}
                             {/*     <IoHeart*/}
                             {/*         className='text-primary-main size-7'/>*/}
                             {/*     <span*/}
                             {/*         className='font-medium text-base'>Favourites</span>*/}
                             {/*</Link>*/}

                             <Link
                                 href='/profile/my-orders'
                                 className='flex items-center space-x-4 text-black'>
                                  <FaShoppingBag
                                      className='text-primary-main size-6'/>
                                  <span
                                      className='font-medium text-base'>My orders</span>
                             </Link>

                             <Link
                                 href='#'
                                 className='flex items-center space-x-4 text-black'>
                                  <FaMapMarkerAlt
                                      className='text-primary-main size-6'/>
                                  <span
                                      className='font-medium text-base'>Delivery address</span>
                             </Link>

                             <Link
                                 href='#'
                                 className='flex items-center space-x-4 text-black'>
                                  <FaCreditCard
                                      className='text-primary-main size-6'/>
                                  <span
                                      className='font-medium text-base'>Payment methods</span>
                             </Link>

                             <Link
                                 href='#'
                                 className='flex items-center space-x-4 text-black'>
                                  <FaEnvelope
                                      className='text-primary-main size-6'/>
                                  <span
                                      className='font-medium text-base'>Contact us</span>
                             </Link>

                             <Link
                                 href='/profile/help-faq'
                                 className='flex items-center space-x-4 text-black'>
                                  <FaQuestionCircle
                                      className='text-primary-main size-6'/>
                                  <span
                                      className='font-medium text-base'>Help & FAQ</span>
                             </Link>

                             <Link
                                 href='/profile/privacy-policy'
                                 className='flex items-center space-x-4 text-black'>
                                  <FaQuestionCircle
                                      className='text-primary-main size-6'/>
                                  <span
                                      className='font-medium text-base'>Privacy policy</span>
                             </Link>

                             <Link
                                 href='/profile/terms-of-service'
                                 className='flex items-center space-x-4 text-black'>
                                  <FaQuestionCircle
                                      className='text-primary-main size-6'/>
                                  <span
                                      className='font-medium text-base'>Terms of service</span>
                             </Link>
                        </section>

                        <section>
                             <SignOutButton/>
                        </section>

                   </div>

                   <div>
                        <BottomNav />
                   </div>
              </main>
          )
     } else {
          return (
              <SignInPage />
          )
     }
}

export default ProfilePage