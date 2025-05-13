'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'


const API_URL = process.env.NEXT_PUBLIC_API_URL

const VerifyEmailPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        // const token = searchParams.get('token')
        // axios.post(`${API_URL}/api/auth/verify`, { token }).then(res => {
        //     const accessToken = res.data?.access_token
        //     if (accessToken) {
        //         localStorage.setItem('accessToken', accessToken)
        //         router.push('/')
        //     } else {
        //         console.log('Invalid or expired token')
        //         router.push('/auth/sign-up')
        //     }
        // })

        const accessToken = searchParams.get('accessToken')

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken)
            router.push('/')
        } else {
            toast.error('An error occurred')
            router.push('/auth/sign-in')
        }
    }, []);

    return <p>Verifying magic link...</p>
}

export default VerifyEmailPage