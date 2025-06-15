import { HiOutlineDocumentText } from "react-icons/hi"
import Link from 'next/link'
import BackButton from '@/components/backButton'

const EmptyOrders = () => {
    return (
        <section className='w-[90%] mx-auto mt-6 flex flex-col items-center justify-center text-center gap-6 px-6'> {/* h-[70vh] */}
            <section className='fixed flex justify-start items-center w-[90%] sm:max-w-[410px] h-10 top-3 left-1/2 -translate-x-1/2 mx-auto z-50'>
                <BackButton />
            </section>

            <HiOutlineDocumentText className='size-16 text-primary-light' />
            <h2 className='text-lg font-semibold text-secondary-soft'>Oops! You haven't made any orders yet.</h2>
            <p className='text-secondary-pale text-sm max-w-sm'>
                Place an order.
            </p>
            <Link
                href='/restaurants'
                className='px-6 py-2.5 bg-primary-light btn'
            >
                Browse restaurants
            </Link>

            {/*add bottom nav here*/}
        </section>
    )
}

export default EmptyOrders