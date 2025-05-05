// // 'use client'
//
// import { MoonLoader } from 'react-spinners'
//
// const Loading = () => {
//     return (
//         <div className='w-[100vw] h-[70vh] mt-16 flex items-center justify-center'>
//             <MoonLoader size={80} loading={true} color='#CB6CE6' aria-label="Loading spinner" />
//             {/* <div className="loading loading-spinner loading-lg" /> */}
//         </div>
//     )
// }
//
// export default Loading

'use client'

import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

const Loading = () => {
    const [showSpinner, setShowSpinner] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(true)
        }, 150)

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-base-100/50 backdrop-blur-md'>
            {showSpinner && (
                <ClipLoader size={80} color="#CB6CE6" aria-label="Loading spinner" />
            )}
        </div>
    )
}

export default Loading