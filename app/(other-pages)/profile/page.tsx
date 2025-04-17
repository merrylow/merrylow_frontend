import BottomNav from '@/components/bottomNav'
import Link from 'next/link'
import { FaUser, FaShoppingBag, FaHourglassHalf, FaMapMarkerAlt, FaCreditCard, FaEnvelope, FaCog, FaQuestionCircle, FaSignOutAlt, FaUserCircle } from 'react-icons/fa'


const ProfilePage = () => {
     return (
          <div className='min-h-screen w-full flex flex-col justify-around items-center'>
               <div className='w-[88%] flex flex-col gap-10'>
                    <section className='flex flex-col items-center space-y-3 text-center'>
                         <FaUserCircle className='text-secondary-pale size-24' />
                         <div>
                              <h2 className='text-md font-bold text-black'>Username</h2>
                              <p className='text-sm text-gray-500'>email</p>
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
                         <button className='w-full h-11 flex items-center justify-center space-x-2.5 btn'>
                              <FaSignOutAlt />
                              <span>Log out</span>
                         </button>
                    </section>

               </div>

               <div>                    
                    <BottomNav />
               </div>
          </div>
     )
}

export default ProfilePage
