'use client'

import { MoonLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className='w-[100vw] h-[70vh] mt-16 flex items-center justify-center'>
            <MoonLoader size={80} loading={true} color='#CB6CE6' aria-label="Loading spinner" />
            {/* <div className="loading loading-spinner loading-lg" /> */}
        </div>
    )
}

export default Loading