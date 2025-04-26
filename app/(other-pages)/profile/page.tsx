import BottomNav from '@/components/bottomNav'
import { FaUser, FaShoppingBag, FaHourglassHalf, FaMapMarkerAlt, FaCreditCard, FaEnvelope, FaCog, FaQuestionCircle } from 'react-icons/fa'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { EmailSignInButton, GoogleSignInButton, SignOutButton } from '@/components/authButtons'


export const dynamic = 'force-dynamic'


const ProfilePage = async () => {
     const session = await auth()

     if (session?.user) {

          return (
               <div className='min-h-screen w-full flex flex-col justify-around items-center'>
                    <div className='w-[88%] flex flex-col gap-12 mt-10'>
                         <section className='flex flex-col space-y-3'>
                              {/*<FaUserCircle className='text-secondary-pale size-24' />*/}
                              <div>
                                   <h2 className='text-lg font-bold text-black'>{session?.user?.name}</h2>
                                   <p className='text-sm text-gray-500'>{session?.user?.email}</p>
                              </div>
                         </section>

                         {/* Menu Items */}
                         <section className='flex flex-col items-start space-y-6'>
                              <Link href='#' className='flex items-center space-x-4 text-black'>
                                   <FaUser className='text-primary-main size-6' />
                                   <span className='font-medium text-base'>My profile</span>
                              </Link>

                              <Link href='/checkout' className='flex items-center space-x-4 text-black'>
                                   <FaHourglassHalf className='text-primary-main size-6' />
                                   <span className='font-medium text-base'>Processing orders</span>
                              </Link>

                              <Link href='#' className='flex items-center space-x-4 text-black'>
                                   <FaShoppingBag className='text-primary-main size-6' />
                                   <span className='font-medium text-base'>My orders</span>
                              </Link>

                              <Link href='#' className='flex items-center space-x-4 text-black'>
                                   <FaMapMarkerAlt className='text-primary-main size-6' />
                                   <span className='font-medium text-base'>Delivery address</span>
                              </Link>

                              <Link href='#' className='flex items-center space-x-4 text-black'>
                                   <FaCreditCard className='text-primary-main size-6' />
                                   <span className='font-medium text-base'>Payment methods</span>
                              </Link>

                              <Link href='#' className='flex items-center space-x-4 text-black'>
                                   <FaEnvelope className='text-primary-main size-6' />
                                   <span className='font-medium text-base'>Contact us</span>
                              </Link>

                              <Link href='#' className='flex items-center space-x-4 text-black'>
                                   <FaCog className='text-primary-main size-6' />
                                   <span className='font-medium text-base'>Settings</span>
                              </Link>

                              <Link href='#' className='flex items-center space-x-4 text-black'>
                                   <FaQuestionCircle className='text-primary-main size-6' />
                                   <span className='font-medium text-base'>Help & FAQ</span>
                              </Link>
                         </section>

                         <section>
                              <SignOutButton />
                         </section>

                    </div>

                    <div>
                         <BottomNav />
                    </div>
               </div>
          )

     }



     return (
         <div className='min-h-screen flex flex-col items-center space-y-2.5'>
              {/* Top Section */}
              <section
                  className='relative h-[30vh] w-full bg-no-repeat bg-cover bg-center rounded-b-3xl flex flex-col justify-end pb-13 text-white'
                  style={{ backgroundImage: `linear-gradient( rgba(19, 19, 38, 0.40), rgba(19, 19, 38, 0.85) ), url('/360_F_351024684_qRJBZa0XlvKs5bKDHVqlcbVF2ux4tDga.jpg')` }}>
                   <div className='w-[88%] mx-auto'>
                        <h1 className='text-3xl font-bold  mb-2'>Welcome back</h1>
                        <p className='text-sm'>
                             Enter your email to sign in to your account
                        </p>
                   </div>
              </section>

              {/* Bottom Section */}
              <section className='h-[45vh] w-[88%] max-w-md flex flex-col justify-evenly'>
                   <form className='flex flex-col space-y-5'>
                        <label htmlFor='email' className='font-medium'>
                             Email
                             <input
                                 id='email'
                                 type='email'
                                 name='email'
                                 placeholder='Enter your email...'
                                 className='mt-1 w-full px-4 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-2 focus:ring-primary-light'
                                 autoComplete='email'
                                 required
                             />
                        </label>

                        <div className='space-y-2'>
                             <EmailSignInButton />
                             <p className='text-sm text-gray-500'>
                                  Don't have an account? <Link href='/auth/sign-up' className='text-primary-main font-medium'>Sign up</Link>
                             </p>
                        </div>
                   </form>


                   <div className='flex items-center justify-center text-sm text-gray-400'>
                        <span className="px-2">or Sign in with Google</span>
                   </div>

                    <GoogleSignInButton />
              </section>

              <div>
                   <BottomNav />
              </div>
         </div>


     )
}

export default ProfilePage
