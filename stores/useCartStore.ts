import axios from 'axios'
import { create } from 'zustand'
import { CartStore, Product, Restaurant, CartItem, PaymentMethod, CardDetails, SelectedAddons } from '@/lib/typeDefs'
import { transformAddonsForBackend } from '@/lib/utilFunctions'
import { getAccessToken } from '@/lib/auth'
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
               set({ loading: true })
               const accessToken = getAccessToken()


               const response = await axios.get(`${API_URL}/api/cart`, {
                    headers: {
                         Authorization: `Bearer ${accessToken}`
                    }
               })
               console.log(response.data.data.items)

               if (response.status === 200) {
                    const fetchedCart = response.data.data.items || []
                    set({ cart: Array.isArray(fetchedCart) ? fetchedCart : [] })
                    get().updateCartCount()
                    // get().calculateCartTotals();
               } else {
                    console.log('Unexpected response', response)
               }
          } catch (error) {
               console.error('Failed to fetch cart from server:', error)
               set({ cart: [], error: true })
          } finally {
               set({ loading: false })
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
               const isSuccess = response.status === 200
               if (isSuccess) toast('Added to cart')
               return isSuccess
          } catch (error) {
               console.log('Cart sync error', error)
               return false
          } finally {
               get().updateCartCount()
               get().calculateCartTotals()
               set({ loading: false })

          }
     },

     updateCartCount: () => {
          const totalCount = get().cart.reduce((acc, item) => acc + item.quantity, 0)
          set({ cartCount: totalCount })
     },


     calculateCartTotals: () => {
          const total = get().cart.reduce((acc, cartItem) => {
               // Base price from menu
               const basePrice = cartItem.menu?.price || 0;

               // Calculate package addon price
               const packagePrice = cartItem.selectedAddons?.package && cartItem.menu?.addOns?.package
                   ? Number(cartItem.menu.addOns.package[cartItem.selectedAddons.package] || 0)
                   : 0;

               // Calculate compulsory addon price
               const compulsoryPrice = cartItem.selectedAddons?.compulsory && cartItem.menu?.addOns?.compulsory
                   ? Number(cartItem.menu.addOns.compulsory[cartItem.selectedAddons.compulsory] || 0)
                   : 0;

               // Calculate optional addons prices
               const optionalPrices = cartItem.selectedAddons?.optional?.reduce((sum, addonName) => {
                    return sum + (Number(cartItem.menu?.addOns?.optional?.[addonName] || 0));
               }, 0) || 0;

               // Calculate item total (base + all addons) * quantity
               const itemTotal = (basePrice + packagePrice + compulsoryPrice + optionalPrices) * cartItem.quantity;

               return acc + itemTotal;
          }, 0);

          set({ cartTotal: total });
     },


     calculateItemTotal: (product: Product | undefined, quantity: number, selectedAddons: SelectedAddons | null) => {
          if (!product) return 0

          const basePrice = Number(product.price) || 0

          // Safely access nested properties
          const packagePrice = selectedAddons?.package && product.addOns?.package
              ? Number(product.addOns.package[selectedAddons.package] || 0)
              : 0;

          const compulsoryPrice = selectedAddons?.compulsory && product.addOns?.compulsory
              ? Number(product.addOns.compulsory[selectedAddons.compulsory] || 0)
              : 0;

          const optionalPrices = selectedAddons?.optional?.reduce((sum, addonName) => {
               return sum + (Number(product.addOns?.optional?.[addonName] || 0))
          }, 0) || 0

          return (basePrice + packagePrice + compulsoryPrice + optionalPrices) * quantity
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

     // checkout page
     paymentMethod: 'mobile_money',
     setPaymentMethod: (method: PaymentMethod) => {
          set({ paymentMethod: method })
          // localStorage.setItem('default-payment-method', get().paymentMethod)
     },
}))

export default useCartStore