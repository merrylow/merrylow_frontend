import axios from 'axios'
import { create } from 'zustand'
import { CartStore, Product, Restaurant, CartItem, PaymentMethod, CardDetails } from '@/lib/typeDefs'

const BASE_URL = process.env.PORT
const API_URL = process.env.NEXT_PUBLIC_API_URL

const useCartStore = create<CartStore>((set, get) => ({
     loading: false,
     error: false,

     // cart data
     cart: typeof window !== 'undefined'
         ? JSON.parse(localStorage.getItem('cart') || '[]')
         : [],
     cartCount: 0,

     addToCart: async (product, quantity, selectedAddons, packageOption, orderNote) => {
          set({ loading: true })

          const newCartItem: CartItem = {
               ...product,
               quantity,
               selectedAddons,
               packageOption,
               orderNote,
          }

          // const existingItem = get().cart.find(item => item.id === product.id)
          const existingItem = get().cart.find(item =>
              item.id === product.id &&
              JSON.stringify(item.selectedAddons) === JSON.stringify(selectedAddons) &&
              item.packageOption === packageOption &&
              item.orderNote === orderNote
          )

          let updatedCart

          if (existingItem) {
               // set({
               //      cart: get().cart.map((item: CartItem) => (
               //               item.id === product.id ? {
               //                    ...item,
               //                    quantity: item.quantity + quantity // item.quantity+1
               //               } : item
               //          )
               //      ),
               // })
               // set({
               //      cart: get().cart.map(item =>
               //          item === existingItem
               //              ? { ...item, quantity: item.quantity + quantity }
               //              : item
               //      )
               // })

               updatedCart = get().cart.map(item =>
                   item === existingItem
                       ? { ...item, quantity: item.quantity + quantity }
                       : item
               )

               set({ cart: updatedCart })

          } else {
               // set({ cart: [...get().cart, newCartItem] })

               updatedCart = [...get().cart, newCartItem]
               set({ cart: updatedCart })
          }

          localStorage.setItem('cart', JSON.stringify(updatedCart))

          // sync with backend cart
          try {
               const response = await axios.post(`${API_URL}/api/cart`, { newCartItem })
               if (response.status === 500) throw new Error('Failed to sync with backend cart')
          } catch (error) {
               console.log('Cart sync error', error)
          }
          set({ loading: false })
     },


     // removeFromCart: (mealId) => {
     //      const updatedCart = get().cart
     //          .map(item =>
     //              item.id === mealId
     //                  ? { ...item, quantity: item.quantity - 1 }
     //                  : item
     //          )
     //          .filter(item => item.quantity > 0)
     //      set({ cart: updatedCart })
     // },

     // clearCart: () => set({ cart: [], cartCount: 0 }),


     // order data
     // orderNote: '',
     // deliveryNote: '',
     // paymentMethod: null,

     // setOrderNote: (note: string) => set({ orderNote: note }),
     // setDeliveryNote: (note: string) => set({ orderNote: note }),
     // setPaymentMethod: (paymentMethod: PaymentMethod) => set({ paymentMethod: paymentMethod }),
}))

export default useCartStore