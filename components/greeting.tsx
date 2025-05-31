'use client'

import useUserStore from '@/stores/useUserStore'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const Greeting = dynamic(() => {
    const Component = () => {
        const { user, fetchUser } = useUserStore()
        const token = localStorage.getItem('accessToken')

        useEffect(() => {
            if(token) {
                fetchUser()
            }
        }, []);
        const isAuthenticated = useUserStore(state => state.isAuthenticated)

        return (
            <h1 className='text-lg font-bold text-secondary-light -mb-7'>
                Hello { isAuthenticated ? (user?.name)?.split(' ')[0] : 'there' }👋🏽
            </h1>
        )
    }
    return Promise.resolve(Component)
}, {
    ssr: false
})

export default Greeting