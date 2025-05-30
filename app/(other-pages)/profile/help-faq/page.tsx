'use client'
import BackButton from '@/components/backButton'

const HelpFAQPage = () => {
    const faqs = [
        {
            question: 'How do I place an order?',
            answer: 'Browse restaurants, select items, add to cart, and checkout. You\'ll receive an order confirmation via email.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept mobile money (MTN, AirtelTigo, Vodafone), cards, and cash on delivery.'
        },
        {
            question: 'How long does delivery take?',
            answer: 'Typically 45-50 minutes depending on your location and restaurant preparation time.'
        },
        // {
        //     question: 'Can I modify/cancel my order?',
        //     answer: 'You can cancel within 5 minutes of ordering. Contact support at '
        // },
        {
            question: 'I have dietary restrictions',
            answer: 'Add special instructions when adding to cart.'
        }
    ]

    return (
        <main className='w-full max-w-md pb-20'>
            {/* Header */}
            <section className='w-[90%] relative py-4 flex items-center justify-center mx-auto'>
                <div className='absolute left-0'>
                    <BackButton />
                </div>

                {/*<h1 className='text-xl font-bold text-gray-800'>Help & FAQs</h1>*/}
                <section className='w-[90%] flex items-center'>
                    <h1 className='flex-1 text-center text-[1.15rem] text-secondary-soft font-bold'>Help & FAQs</h1>
                </section>
            </section>

            {/* Contact Card */}
            <section className='w-[90%] bg-primary-main/60 rounded-lg p-4 mb-6 mx-auto'>
                <h2 className='font-semibold text-white mb-2'>Need immediate help?</h2>
                <p className='text-sm text-white mb-3'>
                    Our support team is available 8AM - 8PM daily
                </p>
                <div className='space-y-2'>
                    <a
                        href='mailto:merrylow.ug@gmail.com'
                        className='flex items-center text-blue-600 text-sm'
                    >
                        ✉️ merrylow.ug@gmail.com
                    </a>
                    <a
                        href='tel:+233596603296'
                        className='flex items-center text-blue-600 text-sm'
                    >
                        📞 +233 59 660 3296
                    </a>
                </div>
            </section>

            {/* FAQ Section */}
            <section className='w-[90%] mx-auto'>
                <h2 className='font-semibold text-gray-800 mb-3'>Frequently Asked Questions</h2>
                <div className='space-y-4'>
                    {faqs.map((faq, index) => (
                        <div key={index} className='border-b border-gray-100 pb-4'>
                            <h3 className='font-medium text-secondary-light'>{faq.question}</h3>
                            <p className='text-sm text-gray-600 mt-1'>
                                {faq.question.includes('modify/cancel') ? (
                                    <>
                                        {faq.answer}
                                        <a href='mailto:merrylow.ug@gmail.com' className='text-primary-main'>
                                            merrylow.ug@gmail.com
                                        </a>
                                        {' immediately.'}
                                    </>
                                ) : (
                                    faq.answer
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default HelpFAQPage