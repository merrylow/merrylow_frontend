'use client'

import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

const Loading = () => {
    const [showSpinner, setShowSpinner] = useState(false)

    // Force the spinner to stay at least 1.5s
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSpinner(true)
        }, 150) // Delay rendering spinner to avoid flashing on super fast loads

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