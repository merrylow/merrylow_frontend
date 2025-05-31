import Portal from '@/components/portal'
import { motion, AnimatePresence } from 'framer-motion'

type PaystackPopupProps = {
    paymentUrl?: string;
    setPaymentUrl: (url: string) => void;
}

const PaystackPopup = ({  paymentUrl, setPaymentUrl }: PaystackPopupProps) => {
    if (!paymentUrl) return null

    return (
        <AnimatePresence>
            <Portal>
                <motion.div className='md:w-[100%] md:h-[100%] m-auto fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center'>
                    <motion.div className='bg-white p-4 rounded-lg w-full max-w-md overflow-hidden shadow-xl'>
                        <iframe
                            src={paymentUrl}
                            className='w-[90%] md:w-full h-[55vh] md:h-[70vh] border-0'
                            allow='payment'
                            title='Paystack Payment'
                        />
                        <button
                            onClick={() => setPaymentUrl('')}
                            className='mt-4 text-center text-red-500'
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            </Portal>
        </AnimatePresence>
    )
}

export default PaystackPopup