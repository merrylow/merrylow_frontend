// import axios from 'axios'
import axiosInstance from '@/lib/interceptors/axios'
import { create } from 'zustand'
import { CartStore, Product, Restaurant, CartItem, PaymentMethod, CardDetails, SelectedAddons } from '@/lib/typeDefs'
import { transformAddonsForBackend } from '@/lib/utilFunctions'
import { getAccessToken } from '@/lib/auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const useCartStore = create<CartStore>((set, get) => ({
     loading: false,
     error: false,

     // cart data
     cart: [],
     cartCount: 0,
     cartTotal: 0,

     initializeCart: () => {
          const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
          if (savedCart) {
               try {
                    const parsedCart = JSON.parse(savedCart)
                    set({ cart: parsedCart })
                    get().updateCartCount();
                    get().calculateCartTotals()
               } catch (error) {
                    console.error('Failed to parse saved cart', error)
                    localStorage.removeItem('cart')
               }
          }
     },

     fetchCart: async () => {
          try {
               set({ loading: true })
               const accessToken = getAccessToken()


               const response = await axiosInstance.get(`${API_URL}/api/cart`, {
                    headers: {
                         Authorization: `Bearer ${accessToken}`
                    }
               })
               // console.log(response.data.data.items)

               if (response.status === 200) {
                    const fetchedCart = response.data.data.items || []
                    set({ cart: Array.isArray(fetchedCart) ? fetchedCart : [] })
                    get().updateCartCount()
                    get().calculateCartTotals()
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

     addToCart: async (product: Product, quantity, selectedAddons: SelectedAddons | null, orderNote): Promise<boolean> => {
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
               const accessToken = getAccessToken()
               const response = await axiosInstance.post(`${API_URL}/api/cart`, cartItemForBackend, {
                    headers: {
                         Authorization: `Bearer ${accessToken}`
                    }
               })

               if (response.status === 201) {
                    toast.success('Added to cart')
                    get().updateCartCount()
                    get().calculateCartTotals()
                    localStorage.setItem('cart', JSON.stringify(updatedCart))
                    return true
               } else {
                    toast.error('Failed to add to cart. Please try again')
                    return false
               }

          } catch (error) {
               console.log('Cart sync error', error)
               set({ cart: get().cart })
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


     // calculateCartTotals: () => {
     //      const total = get().cart.reduce((acc, cartItem) => {
     //           // unit price is pre-calculated by backend
     //           if (cartItem.unitPrice) {
     //                return acc + (Number(cartItem.unitPrice) * cartItem.quantity)
     //           }
     //
     //           const basePrice = Number(cartItem.menu?.price) || 0
     //
     //           const addons = cartItem.description ? JSON.parse(cartItem.description) : {}
     //
     //           const addonsTotal = Object.values(addons).reduce((sum: number, price) => {
     //                return sum + (Number(price) || 0)
     //           }, 0)
     //
     //           return acc + (basePrice + addonsTotal) * cartItem.quantity
     //      }, 0)
     //
     //      set({ cartTotal: total })
     // },
     calculateCartTotals: () => {
          const parseAddons = (description: string) => {
               try {
                    // Clean up the string if it contains escape characters
                    const cleanedString = description.replace(/\\/g, '')

                    // Parse the JSON string
                    const parsed = JSON.parse(cleanedString)

                    // Handle different possible formats
                    if (Array.isArray(parsed)) {
                         // If it's an array, convert to object format
                         const result: Record<string, number> = {}
                         for (let i = 0; i < parsed.length; i += 2) {
                              if (i + 1 < parsed.length) {
                                   result[parsed[i]] = parsed[i + 1]
                              }
                         }
                         return result
                    } else if (typeof parsed === 'object' && parsed !== null) {
                         // If it's already an object, return it
                         return parsed
                    }

                    return {}
               } catch (error) {
                    console.error('Error parsing addons:', error)
                    return {}
               }
          }

          const total = get().cart.reduce((acc, cartItem) => {
               // If unitPrice is available from backend, use that
               if (cartItem.unitPrice) {
                    return acc + (Number(cartItem.unitPrice) * cartItem.quantity)
               }

               // Fallback calculation if unitPrice isn't available
               const basePrice = Number(cartItem.menu?.price) || 0

               // Parse addons using the same method as in the CartPage
               const addons = cartItem.description ? parseAddons(cartItem.description) : {}

               // Sum up all addon prices (excluding special keys like 'name')
               const addonsTotal = Object.entries(addons).reduce((sum: number, [key, value]) => {
                    if (key === 'name' || typeof value !== 'number') return sum
                    return sum + (Number(value) || 0)
               }, 0)

               return acc + (basePrice + addonsTotal) * cartItem.quantity
          }, 0)

          set({ cartTotal: total })
     },


     calculateItemTotal: (product: Product, quantity: number, selectedAddons: SelectedAddons | null) => {
          if (!product) return 0

          const basePrice = (Number(product.price) || 0)

          const packagePrice = selectedAddons?.package && product.addOns?.package
              ? (Number(product.addOns.package[selectedAddons.package]) || 0)
              : 0;

          const compulsoryPrice = selectedAddons?.compulsory && product.addOns?.compulsory
              ? (Number(product.addOns.compulsory[selectedAddons.compulsory]) || 0)
              : 0;

          const optionalPrices = selectedAddons?.optional?.reduce((sum, addonName) => {
               return sum + ((Number(product.addOns?.optional?.[addonName]) || 0))
          }, 0) || 0

          return (basePrice + packagePrice + compulsoryPrice + optionalPrices) * quantity
     },


     removeFromCart: async (productId: string) => {
          set({ loading: true })

          try {
               const updatedCart = get().cart
                   .map(item =>
                       item.id === productId
                           ? { ...item, quantity: item.quantity - 1 }
                           : item
                   )
                   .filter(item => item.quantity > 0)

               set({ cart: updatedCart })

               const accessToken = getAccessToken()
               const response = await axiosInstance.delete(`${API_URL}/api/cart/item/${productId}`, {
                    headers: {
                         Authorization: `Bearer ${accessToken}`
                    }
               })

               if (response.status !== 200) {
                    // If API fails, revert local state
                    set({ cart: get().cart });
                    throw new Error('Failed to remove item from server cart')
               }

               // Update cart count after  removal
               get().updateCartCount()
               toast.success('Item removed from cart')

          } catch (error) {
               console.error('Remove from cart error:', error)
               toast.error('Failed to remove item from cart')
          } finally {
               set({ loading: false })
          }
     },


     clearCart: async () => {
          set({ loading: true })

          try {
               set({ cart: [], cartCount: 0 })

               const accessToken = getAccessToken()
               const response = await axiosInstance.delete(`${API_URL}/api/cart`, {
                    headers: {
                         Authorization: `Bearer ${accessToken}`
                    }
               })

               if (response.status === 200 || response.status === 201) {
                    localStorage.removeItem('cart')
                    toast.success('Cart cleared successfully')
               } else {
                    get().fetchCart()
                    throw new Error('Failed to clear cart on server')
               }

          } catch (error) {
               console.error('Clear cart error:', error)
          } finally {
               set({ loading: false })
          }
     },


     // checkout page
     paymentMethod: 'mobile_money',
     setPaymentMethod: (method: PaymentMethod) => {
          set({ paymentMethod: method })
          // localStorage.setItem('default-payment-method', get().paymentMethod)
     },
}))

export default useCartStore