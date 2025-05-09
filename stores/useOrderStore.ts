import { create } from 'zustand'
import { OrderStore, Product, Restaurant, CartItem, PaymentMethod, CardDetails } from '@/lib/typeDefs'

const BASE_URL = process.env.PORT

const useOrderStore = create<OrderStore>((set, get) => ({
     loading: false,
     error: false,

     // cart data
     cart: [],
     cartCount: 0,

     // addToCart: (meal: Product) => {
     //      set({ loading: true })
     //      const existingItem = get().cart.find(item => item.id === meal.id)
     //      if (existingItem) {
     //           set({
     //                cart: get().cart.map((item): { item: CartItem } => (
     //                         item.id === meal.id ? {
     //                              ...item,
     //                              quantity: item.quantity + 1
     //                         } : item
     //                    )
     //                ),
     //           })
     //           set({ loading: false })
     //      } else {
     //           set({ cart: [...get().cart, { ...meal, quantity: 1 }] })
     //      }
     // },

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
     orderNote: '',
     deliveryNote: '',
     paymentMethod: null,

     setOrderNote: (note: string) => set({ orderNote: note }),
     setDeliveryNote: (note: string) => set({ orderNote: note }),
     setPaymentMethod: (paymentMethod: PaymentMethod) => set({ paymentMethod: paymentMethod }),




     // toggleFavouriteRestaurant: (restaurantId) => {
     //      const currentFavourites = get().favouriteProducts
     //      const isAlreadyFavourited = currentFavourites.some(item => item.id === product.id)
     //
     //      if (isAlreadyFavourited) {
     //           set({
     //                favouriteProducts: currentFavourites.filter(item => item.id !== product.id)
     //           })
     //      } else {
     //           set({
     //                favouriteProducts: [...currentFavourites, product] // ,productId
     //           })
     //      }
     //
     //      // const isFav = get().favouriteRestaurants.some(item => item.id === restaurantId)
     //      // if (isFav) {
     //      //      set({
     //      //           favouriteRestaurants: get().favouriteRestaurants.filter(item => item.id !== restaurantId),
     //      //      })
     //      // } else {
     //      //      set({ favouriteRestaurants: [...get().favouriteRestaurants, restaurantId] })
     //      // }
     // },
}))

export default useOrderStore