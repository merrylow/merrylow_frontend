'use client'

import { Dialog, DialogOverlay, DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"



const ProductModal = ({ params }: { params: { productId: string } }) => {
     const router = useRouter()

     const handleOpenChange = () => {
          router.back()
     }

     return (
          <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
               <DialogOverlay>
                    <DialogContent>
                         <h2>Product ID: {params.productId}</h2>
                         <p>This is your product modal.</p>
                    </DialogContent>
               </DialogOverlay>
          </Dialog>
     )
}

export default ProductModal