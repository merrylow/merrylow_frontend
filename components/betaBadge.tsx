'use client'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import Link from 'next/link'

export const BetaBadge = () => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className='flex items-center space-x-1'>
                  <span className='px-2 pb-1 pt-1.5 bg-primary-light/20 text-primary-main text-xs font-medium rounded-full'>
                    Early Access
                  </span>
                    <Info className='h-3 w-3 text-gray-400' />
                </div>
            </TooltipTrigger>
            <TooltipContent side='bottom' className='bg-secondary-soft'>
                <p className='text-sm text-white'>
                    This is a beta version. Features may change.
                    <Link href='/profile/contact-us' className='text-primary-main ml-1'>
                        Send feedback
                    </Link>
                </p>
            </TooltipContent>
        </Tooltip>
    )
}

export default BetaBadge