'use client'
import BackButton from '@/components/backButton'

const ContactUsPage = () => {
    const contactMethods = [
        {
            icon: '📧',
            title: 'Email Us',
            details: 'merrylow.ug@gmail.com',
            action: 'mailto:merrylow.ug@gmail.com'
        },
        {
            icon: '📞',
            title: 'Call Us',
            details: '+233 59 660 3296',
            action: 'tel:+233596603296'
        },
        {
            icon: '🕒',
            title: 'Hours',
            details: '8AM - 8PM Daily',
            action: null
        },
        {
            icon: '📍',
            title: 'Location',
            details: 'Accra, Ghana',
            action: 'https://maps.app.goo.gl/...' // Add your Google Maps link
        }
    ]

    return (
        <main className='w-full max-w-md pb-20'>
            {/* Header */}
            <section className='w-[90%] relative py-4 flex items-center justify-center mx-auto'>
                <div className='absolute left-0'>
                    <BackButton />
                </div>
                <section className='w-[90%] flex items-center'>
                    <h1 className='flex-1 text-center text-[1.15rem] text-secondary-soft font-bold'>Contact Us</h1>
                </section>
            </section>

            {/* Contact Card */}
            <section className='w-[90%] bg-primary-main/60 rounded-lg p-4 mb-6 mx-auto'>
                <h2 className='font-semibold text-white mb-2'>We're here to help</h2>
                <p className='text-sm text-white mb-3'>
                    Reach out for order issues, feedback, or partnership inquiries
                </p>
            </section>

            {/* Contact Methods */}
            <section className='w-[90%] mx-auto space-y-4'>
                {contactMethods.map((method, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg ${method.action ? 'bg-white shadow-sm' : 'bg-gray-50'}`}
                    >
                        <div className='flex items-center space-x-3'>
                            <span className='text-xl'>{method.icon}</span>
                            <div>
                                <h3 className='font-medium text-secondary-light'>{method.title}</h3>
                                {method.action ? (
                                    <a
                                        href={method.action}
                                        className='text-primary-main text-sm'
                                    >
                                        {method.details}
                                    </a>
                                ) : (
                                    <p className='text-gray-600 text-sm'>{method.details}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* FAQ Preview */}
            <section className='w-[90%] mx-auto mt-8'>
                <h2 className='font-semibold text-gray-800 mb-3'>Common Questions</h2>
                <div className='space-y-2'>
                    {/*<a*/}
                    {/*    href='/profile/help-faq#refund'*/}
                    {/*    className='block text-primary-main text-sm'*/}
                    {/*>*/}
                    {/*    How do I request a refund?*/}
                    {/*</a>*/}
                    <a
                        href='/profile/help-faq#delivery'
                        className='block text-primary-main text-sm'
                    >
                        My food is late - what can I do?
                    </a>
                    {/*<a*/}
                    {/*    href='/profile/help-faq#partner'*/}
                    {/*    className='block text-primary-main text-sm'*/}
                    {/*>*/}
                    {/*    How can my restaurant join MerryLow?*/}
                    {/*</a>*/}
                </div>
            </section>
        </main>
    )
}

export default ContactUsPage