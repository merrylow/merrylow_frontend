import BottomNav from '@/components/bottomNav'
// import { FaUser, FaShoppingBag, FaHourglassHalf, FaMapMarkerAlt, FaCreditCard, FaEnvelope, FaCog, FaQuestionCircle, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'


const ProfilePage = () => {
     // const { isLoggedIn } = useUserStore()

     // if(isLoggedIn) {
     //      return (
     //           <div>User not logged in</div>
     //      )
     // }


     // ui for if user is not logged in

     

     // return (
     //      <div className='min-h-screen w-full flex flex-col justify-around items-center'>
     //           <div className='w-[88%] flex flex-col gap-10'>
     //                <section className='flex flex-col items-center space-y-3 text-center'>
     //                     <FaUserCircle className='text-secondary-pale size-24' />
     //                     <div>
     //                          <h2 className='text-md font-bold text-black'>Username</h2>
     //                          <p className='text-sm text-gray-500'>email</p>
     //                     </div>
     //                </section>
     //
     //                {/* Menu Items */}
     //                <section className='flex flex-col items-start space-y-6'>
     //                     <Link href='#' className='flex items-center space-x-4 text-black'>
     //                          <FaUser className='text-primary-main size-6' />
     //                          <span className='font-medium text-base'>My profile</span>
     //                     </Link>
     //
     //                     <Link href='/checkout' className='flex items-center space-x-4 text-black'>
     //                          <FaHourglassHalf className='text-primary-main size-6' />
     //                          <span className='font-medium text-base'>Processing orders</span>
     //                     </Link>
     //
     //                     <Link href='#' className='flex items-center space-x-4 text-black'>
     //                          <FaShoppingBag className='text-primary-main size-6' />
     //                          <span className='font-medium text-base'>My orders</span>
     //                     </Link>
     //
     //                     <Link href='#' className='flex items-center space-x-4 text-black'>
     //                          <FaMapMarkerAlt className='text-primary-main size-6' />
     //                          <span className='font-medium text-base'>Delivery address</span>
     //                     </Link>
     //
     //                     <Link href='#' className='flex items-center space-x-4 text-black'>
     //                          <FaCreditCard className='text-primary-main size-6' />
     //                          <span className='font-medium text-base'>Payment methods</span>
     //                     </Link>
     //
     //                     <Link href='#' className='flex items-center space-x-4 text-black'>
     //                          <FaEnvelope className='text-primary-main size-6' />
     //                          <span className='font-medium text-base'>Contact us</span>
     //                     </Link>
     //
     //                     <Link href='#' className='flex items-center space-x-4 text-black'>
     //                          <FaCog className='text-primary-main size-6' />
     //                          <span className='font-medium text-base'>Settings</span>
     //                     </Link>
     //
     //                     <Link href='#' className='flex items-center space-x-4 text-black'>
     //                          <FaQuestionCircle className='text-primary-main size-6' />
     //                          <span className='font-medium text-base'>Help & FAQ</span>
     //                     </Link>
     //                </section>
     //
     //                <section>
     //                     <button className='w-full h-11 flex items-center justify-center space-x-2.5 btn'>
     //                          <FaSignOutAlt />
     //                          <span>Log out</span>
     //                     </button>
     //                </section>
     //
     //           </div>
     //
     //           <div>
     //                <BottomNav />
     //           </div>
     //      </div>
     // )


     return (
         <div className='min-h-screen flex flex-col items-center bg-white'>
              {/* Top Section */}
              <section
                  className='relative h-[30vh] w-full bg-no-repeat bg-cover bg-center rounded-b-3xl flex flex-col justify-end pb-13 text-white'
                  style={{ backgroundImage: `linear-gradient( rgba(19, 19, 38, 0.65), rgba(19, 19, 38, 0.95) ), url('/360_F_351024684_qRJBZa0XlvKs5bKDHVqlcbVF2ux4tDga.jpg')` }}>
                   <div className='w-[88%] mx-auto'>
                        <h1 className='text-3xl font-bold  mb-2'>Welcome back</h1>
                        <p className='text-sm'>
                             Enter your email to sign in to your account
                        </p>
                   </div>
              </section>

              {/* Bottom Section */}
              <section className='h-[50vh] w-[88%] max-w-md mt-1.5S flex flex-col justify-evenly'>
                   <div className='space-y-5'>
                        <form>
                             <label htmlFor='email' className='font-medium'>
                                  Email
                             </label>
                             <input
                                 id='email'
                                 type='email'
                                 name='email'
                                 placeholder='Enter your email...'
                                 className='mt-1 w-full px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light'
                                 autoComplete='email'
                             />
                        </form>

                        <button className='w-full h-11 mb-7 bg-primary-light text-white rounded-full font-semibold'>
                             Next
                        </button>

                        <div className='flex items-center justify-center text-sm text-gray-400'>
                             <span className="px-2">or Sign in with Email</span>
                        </div>

                        <button className='w-full h-11 border border-gray-300 rounded-full flex items-center justify-center space-x-2'>
                             <FcGoogle className='size-5' />
                             <span className='text-sm font-medium'>Continue with Google</span>
                        </button>
                   </div>

                   <p className='text-sm text-gray-500'>
                        Don't have an account? <Link href='/auth/sign-up' className='text-primary-main font-medium'>Sign up</Link>
                   </p>
              </section>

              <div>
                   <BottomNav />
              </div>
         </div>


     )


}

export default ProfilePage
