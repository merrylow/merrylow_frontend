'use client'

import { Textarea } from '@/components/ui/textarea'
import { OrderNoteProps } from '@/lib/typeDefs'

const OrderNote = ({ orderNote, setOrderNote }: OrderNoteProps) => {
    return (
        <>
            <Textarea
                id='order-note'
                name='order-note'
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder='Special notes if any.. e.g. need extra sauce...'
                className='w-full min-h-[120px] border border-gray-soft rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/30 placeholder-gray'
            />
        </>
    )
}


const DeliveryNote = () => {
    return (
        <>
            <Textarea
                id='delivery-note'
                name='delivery-note'
                placeholder='Special instructions for delivery, etc.'
                className='w-full min-h-[120px] border border-gray-soft rounded-lg outline-none focus:outline-none focus:ring-1 focus:ring-primary-main/30 placeholder-gray'
            />
        </>
    )
}

export { DeliveryNote, OrderNote }