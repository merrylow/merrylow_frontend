'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { toast } from 'sonner'

// define validation schema with Zod
const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters long')
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

const API_URL = process.env.NEXT_PUBLIC_API_URL

const ForgotPasswordPage = () => {

    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            const response = await axios.post(`${API_URL}/api/auth/forgot-password`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            setSuccess('Reset password link sent to your email')
            //
            // if () {
            //     toast.success('Check your email for the reset password link')
            // }

            setTimeout(() => {
                router.push('/auth/sign-in')
            }, 7000)
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || 'Something went wrong')
            } else {
                setError('Something went wrong')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='max-w-md mx-auto'>
            <section className='w-[90%] mx-auto mb-6 mt-5'>
                <h1 className='text-lg text-center font-bold mb-2'>Forgot Password</h1>
                <p className='text-gray-600 text-base mt-6'>
                    Please enter your email address and a new password. You will receive a
                    link to reset your password.
                </p>
            </section>

            {error && (
                <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
                    {error}
                </div>
            )}

            {success && (
                <div className='mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded'>
                    {success}
                </div>
            )}

            <section className='w-[90%] mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5'>
                    <div>
                        <Label htmlFor='email' className='font-medium'>
                            Email
                        </Label>
                        <Input
                            id='email'
                            type='email'
                            {...register('email')}
                            placeholder='Enter your email...'
                            className={`mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:outline-none focus:ring-1 ${
                                errors.email
                                    ? 'border-red-500 focus:ring-red-500/50'
                                    : 'border-gray-300 focus:ring-primary-main/50'
                            }`}
                            autoComplete='email'
                        />
                        {errors.email && (
                            <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
                        )}
                    </div>

                    <div className='relative'>
                        <Label htmlFor='newPassword' className='font-medium'>
                            New password
                        </Label>
                        <Input
                            id='newPassword'
                            type={showPassword ? 'text' : 'password'}
                            {...register('newPassword')}
                            placeholder='Enter your new password...'
                            className={`mt-1 w-full px-4 py-2 border rounded-lg outline-none focus:outline-none focus:ring-1 ${
                                errors.newPassword
                                    ? 'border-red-500 focus:ring-red-500/50'
                                    : 'border-gray-300 focus:ring-primary-main/50'
                            }`}
                            autoComplete='new-password'
                        />
                        <button
                            type='button'
                            className='absolute right-3 top-6 p-1 text-gray-500 hover:text-gray-700'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className='h-5 w-5' />
                            ) : (
                                <Eye className='h-5 w-5' />
                            )}
                        </button>
                        {errors.newPassword && (
                            <p className='mt-1 text-sm text-red-600'>
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    <div className='space-y-2.5'>
                        <button
                            className='w-full h-11 bg-primary-light text-white rounded-full hover:bg-primary-main transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? (
                                <div className='flex items-center justify-center text-white'>
                                    <span className='loading loading-spinner loading-sm' />
                                    <span className='text-sm text-secondary-soft font-medium ml-2'>
                                        Processing...
                                    </span>
                                </div>
                            ) : (
                                'Reset Password'
                            )}
                        </button>

                        <div className='text-center pt-2'>
                          <span className='text-sm text-gray-500'>
                            Remember your password?{' '}
                              <Link
                                  href='/auth/sign-in'
                                  className='text-primary-main font-medium'
                              >
                              Sign in
                            </Link>
                          </span>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default ForgotPasswordPage