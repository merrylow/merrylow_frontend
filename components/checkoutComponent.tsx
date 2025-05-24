'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import BackButton from '@/components/backButton'
import { PlaceOrderButton } from '@/components/orderButtons'
import PaymentMethodSelector from '@/components/paymentMethodSelector'
import { DeliveryNote } from '@/components/deliveryAndOrderNotes'
import useCartStore from '@/stores/useCartStore'
import { HookConfig } from 'react-paystack/libs/types'
import { toast } from 'sonner'
import useUserStore from '@/stores/useUserStore'


const CheckoutComponent = () => {
    const [firstName, setFirstName] = useState('') // get session.user.name
    const [lastName, setLastName] = useState('')
    const [location, setLocation] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [deliveryNote, setDeliveryNote] = useState('')
    const paymentMethod = useCartStore(state => state.paymentMethod)
    const setPaymentMethod = useCartStore(state => state.setPaymentMethod)
    const { user, fetchUser } = useUserStore()
    const fetchCart = useCartStore(state => state.fetchCart)
    const cart = useCartStore(state => state.cart)
    const cartTotal = useCartStore(state => state.cartTotal)
    const updateCartCount = useCartStore(state => state.updateCartCount)
    // const calculateCartTotals = useCartStore(state => state.calculateCartTotals)
    const name = `${firstName} ${lastName}`

    useEffect(() => {
        fetchCart()
        fetchUser()
    }, [])

    // useEffect(() => {
    //     calculateCartTotals()
    // }, [cart])


    const PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!

    const config: HookConfig = {
        reference: (new Date()).getTime().toString(),
        email: user?.email, // get user's email
        amount: cartTotal * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200 (amount * 10ps)
        publicKey: PUBLIC_KEY,
        currency: 'GHS',
        metadata: {
            name: `${firstName} ${lastName}`,
            phoneNumber,
            custom_fields: []
        }
    };

    const onSuccess = (reference: any) => {
        console.log(reference)
        toast.success(reference)
        // toast.success('Your payment was successful')
    };

    const onClose = () => {
        // implementation for whatever you want to do when the Paystack dialog closed.
        console.log('closed')
        // toast('Your payment was cancelled')
    }


    return (
        <main className='w-full flex flex-col items-center min-h-screen'>
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
                            <section className='w-full space-y-7'>
                                <div>
                                    <Label htmlFor='firstName' className='block text-base font-semibold text-secondary-soft mb-1'>
                                        First Name
                                    </Label>
                                    {/*<FaUser /> // add icons later*/}
                                    <Input
                                        id='firstName'
                                        type='text'
                                        name='first-name'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className='mt-1 w-full pl-3 py-2 border border-gray-soft rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/50'
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
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className='mt-1 w-full pl-3 py-2 border border-gray-soft rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/30'
                                        autoComplete='family-name'
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor='location' className='block text-base font-semibold text-secondary-soft mb-1'>Address</Label>
                                    <Input
                                        id='location'
                                        type='text'
                                        name='location'
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder='Enter the name of your hall/department'
                                        className='mt-1 w-full pl-3 py-2 border border-gray-soft rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/30 placeholder-gray'
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor='phone' className='block text-base font-semibold text-secondary-soft mb-1'>Phone</Label>
                                    <Input
                                        id='phone'
                                        type='tel'
                                        name='phone'
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder='Enter your phone number'
                                        className='mt-1 w-full pl-3 py-2 border border-gray-soft rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/30 placeholder-gray'
                                        autoComplete='tel'
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor='notes' className='block text-base font-semibold text-secondary-soft mb-1.5'>Delivery notes (optional)</Label>
                                    <DeliveryNote deliveryNote={deliveryNote} setDeliveryNote={setDeliveryNote} />
                                </div>
                            </section>

                            <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} config={config} onSuccess={onSuccess} onClose={onClose} />

                            {/* Fixed bottom button */}
                            <section className='fixed bottom-1.5 left-1/2 -translate-x-1/2 w-[90%] bg-transparent py-4 flex justify-between items-center'>
                                <PlaceOrderButton name={name} phone={phoneNumber} notes={deliveryNote} address={location} paymentMethod={paymentMethod}  />
                                {/*<PaystackHookExample />*/}
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
                                {/*<span className='text-sm'>{cart[0].name} - Regular x 1</span> /!* replace 1 with product quantity from quantity selector component *!/*/}
                                {/* if more than one product, conditionally render another span with the product. same for vendor section*/}
                            </div>
                            <div className='flex justify-between py-2 border-b border-b-gray-pale'>
                                <span className='font-medium'>Restaurant</span>
                                <span className='font-medium'>Restaurant name</span>
                                {/*<span className='text-sm'>{cart[0].restaurant.name}</span>*/}
                            </div>
                            <div className='flex justify-between text-md text-secondary-soft py-2 mt-3'>
                                <span className='font-semibold'>Total</span>
                                <span className='font-semibold text-primary-main'>₵{cartTotal}</span>
                            </div>
                        </div>
                    </div>

                    <div className='mb-20'></div>
                </div>
            </section>
        </main>
    )
}

export default CheckoutComponent