'use client'

import { useLoadingStore } from '@/stores/useLoadingStore'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipLoader } from 'react-spinners'

const LoadingOverlay = () => {
    const isLoading = useLoadingStore(state => state.isLoading);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.95 }}
                    exit={{ opacity: 0 }}
                    className='fixed inset-0 bg-secondary-main/40 backdrop-blur-md z-[9999] flex items-center justify-center'
                >
                    <ClipLoader size={70} color='#CB6CE6' />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingOverlay