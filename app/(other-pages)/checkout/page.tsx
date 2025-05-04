import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import BackButton from '@/components/backButton'
import { PlaceOrderButton } from '@/components/orderButtons'
import PaymentMethodSelector from '@/components/paymentMethodSelector'
import DeliveryNotes from '@/components/deliveryNotes'

const CheckoutPage = () => {

     return (
         <div className='w-full flex flex-col items-center min-h-screen'>
              {/* Header section */}
              <section className='w-[90%] flex items-center mt-4'>
                   <div className='flex-1 text-center text-lg text-secondary-soft font-bold'>Checkout</div>
              </section>

              <section className='fixed flex justify-start items-center w-[90%] h-10 top-3 left-1/2 -translate-x-1/2'>
                   <BackButton />
              </section>

              <section className='w-full flex-1 overflow-x-auto'>
                   <div className='min-w-full flex flex-col items-center space-y-3'>
                        {/* Personal Information Form Section */}
                        <div className='w-[88%] space-y-3'>
                             <h2 className="text-md font-semibold mt-4">Customer Details</h2>

                             <form className='space-y-11'>
                                  <section className='w-full space-y-6'>
                                       <div>
                                            <Label htmlFor='firstName' className='block text-base font-semibold text-secondary-soft mb-1'>
                                                 First Name
                                            </Label>
                                            <Input
                                                id='firstName'
                                                type='text'
                                                name='first-name'
                                                className='mt-1 w-full pl-3 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/50'
                                                autoComplete='given-name'
                                                required
                                            />
                                       </div>
                                       <div>
                                            <Label htmlFor='lastName' className='block text-base font-semibold text-secondary-soft mb-1'>Last Name</Label>
                                            <Input
                                                id='lastName'
                                                type='text'
                                                name='last-name'
                                                className='mt-1 w-full pl-3 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/30'
                                                autoComplete='family-name'
                                                required
                                            />
                                       </div>
                                       <div>
                                            <Label htmlFor='location' className='block text-base font-semibold text-secondary-soft mb-1'>Location</Label>
                                            <Input
                                                id='location'
                                                type='text'
                                                name='location'
                                                placeholder='Enter the name of your hall/department'
                                                className='mt-1 w-full pl-3 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/30 placeholder-gray'
                                                required
                                            />
                                       </div>
                                       <div>
                                            <Label htmlFor='phone' className='block text-base font-semibold text-secondary-soft mb-1'>Phone</Label>
                                            <Input
                                                id='phone'
                                                type='tel'
                                                name='phone'
                                                placeholder='Enter your phone number'
                                                className='mt-1 w-full pl-3 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/30 placeholder-gray'
                                                autoComplete='tel'
                                                required
                                            />
                                       </div>
                                       <div>
                                            <Label htmlFor='notes' className='block text-base font-semibold text-secondary-soft mb-1.5'>Delivery notes (optional)</Label>
                                             <DeliveryNotes />
                                       </div>
                                  </section>

                                  <PaymentMethodSelector />

                                  {/* Fixed bottom button */}
                                  <section className='fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[90%] bg-transparent py-4 flex justify-between items-center'>
                                       <PlaceOrderButton />
                                  </section>
                             </form>
                        </div>


                        {/* Order Summary Section */}
                        <div className='w-[88%]'>
                             <h2 className='text-md font-semibold mb-3.5'>Your Order</h2>
                             <div className='text-base text-secondary-soft space-y-3'>
                                  <div className='flex justify-between py-2 border-b border-b-gray-pale'>
                                       <span className='font-medium'>Product</span>
                                       <span className='text-sm'>Meal name - Regular x 1</span>
                                  </div>
                                  <div className='flex justify-between py-2 border-b border-b-gray-pale'>
                                       <span className='font-medium'>Vendor</span>
                                       <span className='text-sm'>Vendor name</span>
                                  </div>
                                  <div className='flex justify-between text-md text-secondary-soft py-2 mt-3'>
                                       <span className='font-semibold'>Total</span>
                                       <span className='font-semibold text-primary-main'>₵40.00</span>
                                  </div>
                             </div>
                        </div>

                        <div className='mb-20'></div>
                   </div>
              </section>
         </div>
     )
}

export default CheckoutPage