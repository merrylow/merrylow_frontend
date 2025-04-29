'use client'

import { Textarea } from '@/components/ui/textarea'

const DeliveryNotes = () => {
    return (
        <>
            <Textarea
                id='notes'
                placeholder='Special instructions for delivery, etc.'
                className='w-full min-h-[120px] border border-gray rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/30 placeholder-gray'
            />
        </>
    )
}

export default DeliveryNotes