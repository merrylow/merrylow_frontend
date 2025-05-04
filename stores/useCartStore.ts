import { create } from 'zustand'

const BASE_URL = process.env.PORT

const useCartStore = create((set, get) => ({
     cart: [],
     loading: false,
     error: false,
     isFavourited: false,
     favouriteMeals: [],
     favouriteStores: [],

     // setIsFavourited: (isFavourited) => set({ isFavourited }),
     addCartItem: () => {},
     removeCartItem: () => {},
     
}))

export default useCartStore