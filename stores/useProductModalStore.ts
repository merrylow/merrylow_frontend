import { create } from 'zustand'
import { Product, Restaurant, ProductModalState } from '@/lib/typeDefs'

const useProductModalStore = create<ProductModalState>((set) => ({
    restaurantId: null,
    productId: null,
    open: false,
    setProductData: (restaurantId, productId) =>
        set({ restaurantId, productId, open: true }),
    closeModal: () => set({ open: false }),
}));

export default useProductModalStore