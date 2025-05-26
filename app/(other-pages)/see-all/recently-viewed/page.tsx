import BackButton from '@/components/backButton'

const RecentlyViewedPage = () => {
    return (
        <main className='w-full flex flex-col items-center min-h-screen'>
            <section className='w-[90%] flex items-center mt-4'>
                <div className='flex-1 text-center text-lg text-secondary-soft font-bold'>Recently Viewed</div>
            </section>

            <section className='fixed flex justify-start items-center w-[90%] h-10 top-3 left-1/2 -translate-x-1/2'>
                <BackButton />
            </section>

            <section className='w-full flex-1'>

            </section>
        </main>
    )
}

export default RecentlyViewedPage