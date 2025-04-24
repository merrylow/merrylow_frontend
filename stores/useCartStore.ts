import { create } from 'zustand'

const BASE_URL = process.env.PORT

const useCartStore = create((set, get) => ({
     cart: [],
     loading: false,
     error: false,

     addProduct: () => {},
     
}))

export default useCartStore