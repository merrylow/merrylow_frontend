'use client'

import { Textarea } from '@/components/ui/textarea'
import useOrderStore from '@/stores/useOrderStore'


const OrderNote = () => {
    // import { shallow } from 'zustand/shallow'
    // const [orderNote, setOrderNote] = useOrderStore(
    //     state => [state.orderNote, state.setOrderNote],
    //     shallow
    // )

    const orderNote = useOrderStore(state => state.orderNote)
    const setOrderNote = useOrderStore(state => state.setOrderNote)
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