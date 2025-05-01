'use client'

import { Dialog, DialogOverlay, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'


const Modal = ({ children }: { children: React.ReactNode }) => {
     const router = useRouter()

     const handleOpenChange = () => {
          router.back()
     }

     return (
          <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
               <DialogTitle />
               <DialogContent className='h-[85vh]'>
                    { children }
               </DialogContent>
          </Dialog>
     )
}

export default Modal