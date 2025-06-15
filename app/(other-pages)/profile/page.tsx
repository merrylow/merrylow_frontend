'use client'

import { useEffect, useState } from 'react'
import BottomNav from '@/components/bottomNav'
import {
     FaUser,
     FaUserCircle,
     FaShoppingBag,
     FaHourglassHalf,
     FaMapMarkerAlt,
     FaCreditCard,
     FaEnvelope,
     FaCog,
     FaQuestionCircle,
     FaShieldAlt,
     FaFileAlt,
     FaSignOutAlt,
     FaSignInAlt
} from 'react-icons/fa'
import Link from 'next/link'
import { SignOutButton } from '@/components/authButtons'
import { IoHeart } from 'react-icons/io5'
import Image from 'next/image'
import useUserStore from '@/stores/useUserStore'
import { useRouter } from 'next/navigation'
import SignInPage from '@/app/(other-pages)/auth/sign-in/page'
import LoadingSpinner
     from '@/components/loadingSpinner'


export const dynamic = 'force-dynamic'

const ProfilePage = () => {
     const router = useRouter()
     const user = useUserStore(state => state.user)
     const fetchUser = useUserStore(state => state.fetchUser)
     const isAuthenticated = useUserStore(state => state.isAuthenticated)
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          const checkAuth = async () => {
               await fetchUser()
               setLoading(false)
          }
          checkAuth()
     }, [fetchUser])


     if(loading) {
          return (
              <main
                  className='w-full h-[100vh] flex items-center justify-center'>
                   <LoadingSpinner/>
              </main>
          )
     }

     return (
         <main
             className='min-h-screen w-full flex flex-col justify-around items-center overflow-y-scroll'>
              <div className='w-[88%] flex flex-col gap-14 mt-1'> {/*gap-11*/}
                   <section className='flex flex-col gap-y-4'>
                        <div className='w-full bg-primary-main/60 rounded-lg p-4 space-y-1.5 mx-auto'>
                             <h2 className='font-semibold text-white'>You're using an early version of our platform.</h2>
                             <p className='text-sm text-white'>
                                  <Link href='/profile/contact-us' className='text-blue-500'>
                                       Report any issues
                                  </Link>
                             </p>
                        </div>

                        <div className='flex gap-3'>
                             <div className='relative size-16 rounded-full overflow-hidden'>
                                  { user && user?.imgUrl ? (
                                      <Image
                                          className='rounded-full ovject-cover'
                                          src={`${user?.imgUrl}`}
                                          fill
                                          alt=''
                                      />
                                  ) : (
                                        <FaUserCircle className='text-secondary-pale size-16' />
                                  ) }
                             </div>
                             <div className='flex flex-col justify-center -space-y-1'>
                                  <h2 className='text-lg font-bold text-black'>{user?.name}</h2>
                                  <p className='text-sm text-gray-500'>{user?.email}</p>
                             </div>
                        </div>
                   </section>

                   {/* Menu Items */}
                   <section
                       className='flex flex-col items-start space-y-7'> {/*space-y-6*/}
                       {/*<Link*/}
                       {/*   //  href='#'*/}
                       {/*  //   className='flex items-center space-x-4 text-black'>*/}
                       {/*   //   <FaUser*/}
                       {/*    //      className='text-primary-main size-6'/>*/}
                       {/*    //  <span*/}
                       {/*     //     className='font-medium text-base'>My profile</span>*/}
                       {/* // </Link>*/}

                        {/*<Link*/}
                        {/*    href='/'*/}
                        {/*    className='flex items-center space-x-4 text-black'>*/}
                        {/*     <IoHeart*/}
                        {/*         className='text-primary-main size-7'/>*/}
                        {/*     <span*/}
                        {/*         className='font-medium text-base'>Favourites</span>*/}
                        {/*</Link>*/}

                        {/*<Link*/}
                        {/*    href='/profile/my-orders'*/}
                        {/*    className='flex items-center space-x-4 text-black'>*/}
                        {/*     <FaShoppingBag*/}
                        {/*         className='text-primary-main size-6'/>*/}
                        {/*     <span*/}
                        {/*         className='font-medium text-base'>My orders</span>*/}
                        {/*</Link>*/}

                        <Link
                            href='#'
                            className='w-full flex items-center justify-between space-x-4 text-black'
                        >
                             <span className='flex gap-4'>
                                  <FaMapMarkerAlt
                                      className='text-primary-main size-6'/>
                                  <span
                                      className='font-medium text-base'>Delivery address</span>
                             </span>

                             <span className='text-base text-gray-600'>University of Ghana</span>
                        </Link>

                        {/*<Link*/}
                        {/*    href='#'*/}
                        {/*    className='flex items-center space-x-4 text-black'>*/}
                        {/*     <FaCreditCard*/}
                        {/*         className='text-primary-main size-6'/>*/}
                        {/*     <span*/}
                        {/*         className='font-medium text-base'>Payment methods</span>*/}
                        {/*</Link>*/}

                        <Link
                            href='/profile/contact-us'
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
                             <FaShieldAlt className='text-primary-main size-6'/>
                             <span className='font-medium text-base'>Privacy policy</span>
                        </Link>

                        <Link
                            href='/profile/terms-of-service'
                            className='flex items-center space-x-4 text-black'>
                             <FaFileAlt className='text-primary-main size-6'/>
                             <span className='font-medium text-base'>Terms of service</span>
                        </Link>
                   </section>

                   <section>
                        {
                             user ? (
                                 <SignOutButton/>
                             ) : (
                                 <Link 
                                     href='/auth/sign-in'
                                     className='w-full h-11 flex items-center justify-center space-x-2.5 btn'
                                 >
                                      {loading ? (
                                          <div className='flex items-center justify-center text-white space-x-1.5'>
                                               <span className='loading loading-spinner loading-sm' />
                                               <span>Sign in</span>
                                          </div>
                                      ) : (
                                          <>
                                               <FaSignInAlt />
                                               <span>Sign in</span>
                                          </>
                                      )
                                      }
                                 </Link>
                             )
                        }
                   </section>

              </div>

              <div>
                   <BottomNav />
              </div>
         </main>
     )
}

export default ProfilePage