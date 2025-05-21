'use client'

import useUserStore from '@/stores/useUserStore'
import {
    useEffect
} from 'react'

const Greeting = () => {
    // const user = useUserStore(state => state.user)

    const { user, fetchUser } = useUserStore()
    const token = localStorage.getItem('accessToken')

    useEffect(() => {
        if(token) {
            fetchUser()
        }
    }, []);
    const isAuthenticated = useUserStore(state => state.isAuthenticated)

    console.log(user)

    return (
        <h1 className='text-lg font-bold text-secondary-light -mb-7'>
            Hello { isAuthenticated ? (user?.name)?.split(' ')[0] : 'there' }👋🏽
        </h1>
    )
}

export default Greeting