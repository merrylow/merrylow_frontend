import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import BackButton
    from "@/components/backButton";

const EmptyCart = () => {
    return (
        <section className='w-[90%] mx-auto mt-6 flex flex-col items-center justify-center text-center gap-6 px-6'> {/* h-[70vh] */}
            <section className='fixed flex justify-start items-center w-[90%] sm:max-w-[410px] h-10 top-3 left-1/2 -translate-x-1/2 mx-auto z-50'>
                <BackButton />
            </section>

            <ShoppingCart className='size-16 text-primary-light' />
            <h2 className='text-lg font-semibold text-secondary-soft'>Oops! Your cart is empty</h2>
            <p className='text-secondary-pale text-sm max-w-sm'>
                You haven’t added anything yet. Let’s fix that — check out what’s cooking!
            </p>
            <Link
                href='/restaurants'
                className='px-6 py-2.5 bg-primary-light btn'
            >
                Browse restaurants
            </Link>
        </section>
    );
}

export default EmptyCart
