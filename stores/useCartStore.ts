import axios from 'axios'
import { create } from 'zustand'
import { CartStore, Product, Restaurant, CartItem, PaymentMethod, CardDetails, SelectedAddons } from '@/lib/typeDefs'
import { transformAddonsForBackend } from '@/lib/utilFunctions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NEXT_PUBLIC_API_URL

const useCartStore = create<CartStore>((set, get) => ({
     loading: false,
     error: false,

     // cart data
     cart: [],
     cartCount: 0,
     cartTotal: 0,

     fetchCart: async () => {
          try {
               set({ loading: true });
               const accessToken = localStorage.getItem('accessToken');

               const response = await axios.post(`${API_URL}/api/cart`, {}, {
                    headers: {
                         Authorization: `Bearer ${accessToken}`
                    }
               });

               if (response.status === 200) {
                    const fetchedCart = response.data.data // Adjust if your API sends it differently
                    set({ cart: fetchedCart });
                    get().updateCartCount();
                    // get().calculateCartTotals();
               } else {
                    console.log('Unexpected response', response);
               }
          } catch (error) {
               console.error('Failed to fetch cart from server:', error);
               set({ error: true });
          } finally {
               set({ loading: false });
          }
     },

     addToCart: async (product: Product, quantity, selectedAddons: SelectedAddons | null, orderNote) => {
          set({ loading: true })

          const newCartItem: CartItem = {
               id: product.id,
               name: product.name,
               imageUrl: product.imageUrl,
               price: product.price,
               restaurant: product.restaurant,
               productId: product.id,
               alt: product.alt,
               addOns: product.addOns,
               quantity,
               selectedAddons,
               orderNote,
          }


          const existingItem = get().cart.find(item =>
              item.productId === newCartItem.productId &&
              item.orderNote === newCartItem.orderNote &&
              JSON.stringify(item.selectedAddons) === JSON.stringify(newCartItem.selectedAddons)
          )

          let updatedCart

          if (existingItem) {
               updatedCart = get().cart.map(item =>
                    item.productId === existingItem.productId &&
                    item.orderNote === existingItem.orderNote &&
                    JSON.stringify(item.selectedAddons) === JSON.stringify(existingItem.selectedAddons)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
               )
          } else {
               updatedCart = [...get().cart, newCartItem]
          }
          set({ cart: updatedCart })

          // localStorage.setItem('cart', JSON.stringify(updatedCart))

          const backendAddons = transformAddonsForBackend(selectedAddons, newCartItem.addOns);

          const cartItemForBackend = {
               productId: product.id,
               quantity,
               selectedAddons: backendAddons,
               basePrice: Number(product.price),
               notes: orderNote,
          }

          console.log(cartItemForBackend)
          console.log(cartItemForBackend.selectedAddons)

          // sync with backend cart
          try {
               const accessToken = localStorage.getItem('accessToken')
               const response = await axios.post(`${API_URL}/api/cart`, cartItemForBackend, {
                    headers: {
                         Authorization: `Bearer ${accessToken}`
                    }
               })
               console.log(response)
               if(response.status === 200) {
                    toast('Added to cart')
               } else if(response.status === 500) {
                    console.log('Failed to sync with backend cart')
               }
          } catch (error) {
               console.log('Cart sync error', error)
          }

          get().updateCartCount()
          // get().calculateCartTotals()
          set({ loading: false })
     },

     updateCartCount: () => {
          const totalCount = get().cart.reduce((acc, item) => acc + item.quantity, 0)
          set({ cartCount: totalCount })
     },
     //
     // calculateCartTotals: () => {
     //      const total = get().cart.reduce((acc, cartItem: CartItem) => {
     //           const basePrice = Number(cartItem.price)
     //           const addonsTotal = cartItem.selectedAddons?.reduce((sum, addon) => sum + Number(addon.price), 0) || 0
     //           const packagePrice = cartItem.packageOption?.price ? Number(cartItem.packageOption.price) : 0
     //           const itemTotal = (basePrice + addonsTotal + packagePrice) * cartItem.quantity
     //
     //           return acc + itemTotal
     //      }, 0)
     //      set({ cartTotal: formatCurrency(total) })
     // }


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

     // checkout page
     paymentMethod: 'mobile_money',
     setPaymentMethod: (method: PaymentMethod) => {
          set({ paymentMethod: method })
          // localStorage.setItem('default-payment-method', get().paymentMethod)
     },
}))

export default useCartStore