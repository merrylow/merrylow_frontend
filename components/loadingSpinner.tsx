// 'use client'
import { ClipLoader } from 'react-spinners'
const LoadingSpinner = () => {
    return (
        <div className='flex items-center justify-center'>
            <ClipLoader size={60} loading={true} color='#CB6CE6' aria-label='Loading spinner' />
            {/* <div className="loading loading-spinner loading-lg" /> */}
        </div>
    )
}
export default LoadingSpinner