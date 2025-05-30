import BackButton from '@/components/backButton'

const TermsOfServicePage = () => {
    return (
        <main className='w-full flex flex-col items-center'>
            <section className='w-[90%] flex items-center mt-4.5'>
                <h1 className='flex-1 text-center text-[1.2rem] text-secondary-soft font-bold'>Terms of Service</h1>
            </section>

            <section className='fixed flex justify-start items-center w-[90%] md:max-w-[410px] h-10 top-3 left-1/2 -translate-x-1/2'>
                <BackButton />
            </section>

            <section className='w-[90%] mt-5'>
                <p className='text-left text-base text-secondary-soft'>
                    By using this service, you agree to use it responsibly.
                    We reserve the right to terminate abusive accounts.
                    All content remains property of their respective owners.
                    For questions, contact <a
                    href='mailto:merrylow.ug@gmail.com'
                    className='text-primary-main/90 inline'
                    >
                        merrylow.ug@gmail.com
                    </a>
                </p>
            </section>
        </main>
    )
}

export default TermsOfServicePage