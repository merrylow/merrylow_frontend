'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

const PaymentMethodSelector = () => {
    return (
        <section className='w-full mt-6'>
            <h2 className='text-md font-semibold mb-2'>Payment Method</h2>
            <RadioGroup defaultValue='mobile_money' className='space-y-4'>
                {/* Mobile Money or Bank Cards Option */}
                <Label htmlFor='mobile_money' className='flex items-start p-4 border border-gray rounded-lg space-x-4 font-semibold text-base text-secondary-light mb-2'>
                    <RadioGroupItem value='mobile_money' id='mobile_money' className='mt-1.5' />
                    <div className='flex flex-col'>
                        <h1 className='mt-1'>
                            Mobile Money or Bank Cards
                        </h1>
                        <div className='grid grid-cols-3 grid-row-2 gap-y-2.5 space-x-4 mt-3 mb-2'>
                            {/* Payment logos */}
                            <Image
                                src='/payment-methods/paystack.jpg'
                                alt='paystack' height={35} width={40}
                            />
                            <Image
                                src='/payment-methods/visa-logo-svgrepo-com.svg'
                                alt='visa' height={30} width={40}
                            />
                            <Image
                                src='/payment-methods/mastercard-4.svg'
                                alt='mastercard' height={24} width={45}
                            />
                            <Image
                                src='/payment-methods/mtn-momo.jpg'
                                alt='mtn momo' height={10} width={50}
                            />
                            <Image
                                src='/payment-methods/telecel-cash.jpg'
                                alt='telecel cash' height={24} width={50}
                            />
                            <Image
                                src='/payment-methods/at-money2.jpg'
                                alt='at money' height={24} width={50}
                            />
                        </div>
                        <p className='text-sm font-medium text-gray-500 mt-1'>
                            Make payment using your mobile money wallet or debit/credit cards
                        </p>
                    </div>
                </Label>

                {/* Cash on Delivery Option */}
                <Label htmlFor='cash_on_delivery' className='font-semibold text-base text-secondary-light mb-1 flex items-start p-4 border border-gray rounded-lg space-x-4'>
                    <RadioGroupItem value='cash_on_delivery' id='cash_on_delivery' className='mt-1.5' />
                    <div className='flex flex-col mt-1'>
                        Cash on Delivery
                    </div>
                </Label>
            </RadioGroup>
        </section>
    )
}

export default PaymentMethodSelector