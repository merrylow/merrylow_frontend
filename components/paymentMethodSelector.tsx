'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const PaymentMethodSelector = () => {
    const [selected, setSelected] = useState('mobile_money')

    return (
        <section className='w-full mt-6'>
            <h2 className='text-md font-semibold mb-2'>Payment Method</h2>
            <RadioGroup
                defaultValue='mobile_money'
                onValueChange={(value) => setSelected(value)}
                className='space-y-4'
            >
                {/* Mobile Money Option */}
                <Label
                    htmlFor='mobile_money'
                    className={`flex items-start rounded-lg space-x-4 transition-all cursor-pointer p-4 ${
                        selected === 'mobile_money'
                            ? 'border border-primary-light/50 bg-primary-light/5 ring-2 ring-primary-light/30 shadow-lg'
                            : 'border border-gray-soft'
                    }`}
                >
                    <RadioGroupItem value='mobile_money' id='mobile_money' className='mt-1.5' />
                    <div className='flex flex-col w-full'>
                        <h1 className='font-semibold text-base text-secondary-soft pt-1'>Mobile Money or Bank Cards</h1>
                        <div className='grid grid-cols-3 grid-rows-2 gap-y-3.5 gap-x-2 mt-3 mb-2'>
                            <Image src='/payment-methods/paystack.jpg' alt='paystack' height={35} width={45} />
                            <Image src='/payment-methods/visa-logo-svgrepo-com.svg' alt='visa' height={30} width={45} />
                            <Image src='/payment-methods/mastercard-4.svg' alt='mastercard' height={24} width={45} />
                            <Image src='/payment-methods/mtn-momo.jpg' alt='mtn momo' height={10} width={55} />
                            <Image src='/payment-methods/telecel-cash.jpg' alt='telecel cash' height={24} width={55} />
                            <Image src='/payment-methods/at-money2.jpg' alt='at money' height={24} width={55} />
                        </div>

                        {/* Collapsible Text */}
                        <AnimatePresence initial={false}>
                            {selected === 'mobile_money' && (
                                <motion.p
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeIn' }}
                                    className='text-sm font-medium text-gray-500 -mt-1 overflow-hidden'
                                >
                                    Make payment using your mobile money wallet or debit/credit cards
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </Label>

                {/* Cash on Delivery Option */}
                <Label
                    htmlFor='cash_on_delivery'
                    className={`flex items-start p-4 rounded-lg space-x-4 transition-all cursor-pointer ${
                        selected === 'cash_on_delivery'
                            ? 'border border-primary-main/50 bg-primary-main/5 ring-2 ring-primary-main/30 shadow-lg'
                            : 'border border-gray-soft'
                    }`}
                >
                    <RadioGroupItem value='cash_on_delivery' id='cash_on_delivery' className='mt-1.5' />
                    <div className='flex flex-col mt-1 w-full'>
                        <h1 className='font-semibold text-base text-secondary-light'>Cash on Delivery</h1>

                        {/* Collapsible Text */}
                        <AnimatePresence initial={false}>
                            {selected === 'cash_on_delivery' && (
                                <motion.p
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2, ease: 'easeIn' }}
                                    className='text-sm font-medium text-gray-500 mt-1 overflow-hidden'
                                >
                                    Pay with cash upon delivery
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </Label>
            </RadioGroup>
        </section>
    )
}

export default PaymentMethodSelector
