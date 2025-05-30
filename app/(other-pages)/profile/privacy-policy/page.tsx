import BackButton from '@/components/backButton'

const PrivacyPolicyPage = () => {
    return (
        <main className='w-full flex flex-col items-center'>
            <section className='w-[90%] flex items-center mt-4.5'>
                <h1 className='flex-1 text-center text-[1.2rem] text-secondary-soft font-bold'>Privacy Policy</h1>
            </section>

            <section className='fixed flex justify-start items-center w-[90%] md:max-w-[410px] h-10 top-3 left-1/2 -translate-x-1/2'>
                <BackButton />
            </section>

            <section className='w-[90%] mt-5'>
                <p className='text-left text-base text-secondary-soft'>
                    We collect basic user information through Google OAuth solely for authentication purposes.
                    We do not share your data with third parties.
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

export default PrivacyPolicyPage