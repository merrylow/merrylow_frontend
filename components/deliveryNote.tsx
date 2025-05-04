'use client'

import { Textarea } from '@/components/ui/textarea'

const DeliveryNote = () => {
    return (
        <>
            <Textarea
                id='note'
                name='note'
                placeholder='Special instructions for delivery, etc.'
                className='w-full min-h-[120px] border border-gray-soft rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/20 placeholder-gray'
            />
        </>
    )
}

export default DeliveryNote