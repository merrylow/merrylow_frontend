import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label';
import BackButton from '@/components/backButton'
import { PlaceOrderButton } from '@/components/orderButtons'
import PaymentMethodSelector from '@/components/paymentMethodSelector';

const CheckoutPage = () => {

     return (
         <div className='w-full flex flex-col items-center min-h-screen'>
              {/* Header section */}
              <section className='w-[90%] flex items-center mt-4'>
                   <div className='flex-1 text-center text-lg text-secondary-light font-bold'>Checkout</div>
              </section>

              <section className='fixed flex justify-start items-center w-[90%] h-10 top-3 left-1/2 -translate-x-1/2'>
                   <BackButton />
              </section>

              <section className='w-full flex-1 overflow-x-auto'>
                   <div className="min-w-full flex flex-col items-center space-y-3">
                        {/* Personal Information Form Section */}
                        <div className="w-[90%] space-y-3">
                             <h2 className="text-md font-semibold mt-4">Personal Information</h2>

                             <form className="space-y-11">
                                  <section className='w-full space-y-7'>
                                       <div>
                                            <Label htmlFor="firstName" className="block text-base font-semibold text-gray-700 mb-1">
                                                 First Name
                                            </Label>
                                            <Input
                                                id='firstName'
                                                type='text'
                                                name='first-name'
                                                className='mt-1 w-full pl-3 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-light'
                                                autoComplete='given-name'
                                                required
                                            />
                                       </div>
                                       <div>
                                            <Label htmlFor="lastName" className="block text-base font-semibold text-gray-700 mb-1">Last Name</Label>
                                            <Input
                                                id='lastName'
                                                type='text'
                                                name='last-name'
                                                className='mt-1 w-full pl-3 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-light'
                                                autoComplete='family-name'
                                                required
                                            />
                                       </div>
                                       <div>
                                            <Label htmlFor="address" className="block text-base font-semibold text-gray-700 mb-1">Location</Label>
                                            <Input
                                                id='address'
                                                type='text'
                                                name='address'
                                                placeholder='Enter the name of your hall/department'
                                                className='mt-1 w-full pl-3 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-light'
                                                // autoComplete='location'
                                                required
                                            />
                                       </div>
                                       <div>
                                            <Label htmlFor='phone' className='block text-base font-semibold text-gray-700 mb-1'>Phone</Label>
                                            <Input
                                                id='phone'
                                                type='tel'
                                                name='phone'
                                                placeholder='Enter your phone number'
                                                className='mt-1 w-full pl-3 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-light'
                                                autoComplete='tel'
                                                required
                                            />
                                       </div>
                                       <div>
                                            <Label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-1">Email Address</Label>
                                            <Input
                                                id='email'
                                                type='email'
                                                name='email'
                                                placeholder='Enter your email address'
                                                className='mt-1 w-full pl-3 py-2 border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-light'
                                                autoComplete='on'
                                                required
                                            />
                                       </div>
                                  </section>

                                  {/* Additional Information Section */}
                                  <section className="w-full">
                                       <h2 className="text-md font-semibold">Additional Information</h2>
                                       <div>
                                            <Label htmlFor="notes" className="block text-base font-semibold text-gray-700 mb-1">Order notes (optional)</Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Special instructions for delivery, etc."
                                                className=" w-full min-h-[120px] border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:border-primary-light"
                                            />
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
                        <div className="w-[90%]">
                             <h2 className="text-md font-semibold mb-3.5">Your Order</h2>
                             <div className="text-base space-y-3">
                                  <div className='flex justify-between py-2 border-b border-b-gray-pale'>
                                       <span>Product</span>
                                       <span>Meal name - Regular x 1</span>
                                  </div>
                                  <div className="flex justify-between py-2 border-b border-b-gray-pale">
                                       <span className="font-medium">Vendor</span>
                                       <span>Vendor name</span>
                                  </div>
                                  <div className="flex justify-between text-md py-2 mt-3">
                                       <span className="font-semibold">Total</span>
                                       <span className="font-semibold text-primary-main">₵40.00</span>
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