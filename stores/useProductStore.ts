import { create } from 'zustand'
import axios from 'axios'
import { Product, Restaurant, ProductStore } from '@/lib/typeDefs'


const API_URL = process.env.NEXT_PUBLIC_API_URL

const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    restaurants: [],
    loading: false,
    error: null,
    currentProduct: null,


    fetchProducts: async () => {
        set({ loading: true })

        try {
            const response = await axios.get(`${API_URL}/api/products`)
            console.log('Fetched products: ', response.data);
            set({ products: response.data.data, error: null }) // one 'data' is coming from axios, the other from our api
        } catch (err: any) {
            if(err.status === 429) set({ error: 'Rate limit exceeded', products: [] })
            else set({ error: 'Something went wrong', products: [] })
        } finally {
            set({ loading: false })
        }
    },

    // fetchProduct: async (id: string) => {
    //     set({ loading: true })
    //     const url = `${API_URL}/api/products/${id}`
    //     console.log('Fetching from:', url)
    //
    //     try {
    //         const url = `${API_URL}/api/products/${id}`
    //         console.log('Fetching products from:', url)
    //         const response = await axios.get(url)
    //         set({
    //             currentProduct: response.data,
    //             error: null
    //         })
    //     } catch (error) {
    //         console.error('Error in fetchProduct function', error)
    //         set({
    //             error: "Couldn't fetch product",
    //             currentProduct: null
    //         })
    //     } finally {
    //         set({ loading: false })
    //     }
    // },


    fetchRestaurants: async () => {
        set({ loading: true })

        try {
            const response = await axios.get(`${API_URL}/api/restaurant`)
            console.log('Fetched restaurants: ', response.data);
            set({ restaurants: response.data.data, error: null }) // one 'data' is coming from axios, the other from our api
        } catch (err: any) {
            set({ error: 'Something went wrong', restaurants: [] })
        } finally {
            set({ loading: false })
        }
    },


    //favourites
    favouriteProducts: [],
    favouriteRestaurants: [],

    toggleFavouriteProduct: (product: Product | undefined) => {
        if (!product) return

        const currentFavourites: Product[] | undefined = get().favouriteProducts ?? []
        const isAlreadyFavourited = currentFavourites?.some(item => item.id === product.id)

        if (isAlreadyFavourited) {
            set({
                favouriteProducts: currentFavourites?.filter(item => item.id !== product.id)
            })
        } else {
            set({
                favouriteProducts: [...currentFavourites, product] // ,productId
            })
        }
    },

    isProductFavourited: (product: Product | undefined) => {
        if (!product) return false
        const favourites = get().favouriteProducts ?? []
        return favourites.some(item => item.id === product.id)
    },

    toggleFavouriteRestaurant: (restaurant: Restaurant | undefined) => {
        if (!restaurant) return

        const currentFavourites: Restaurant[] | undefined = get().favouriteRestaurants ?? []
        const isAlreadyFavourited = currentFavourites?.some(item => item.id === restaurant.id)

        if (isAlreadyFavourited) {
            set({
                favouriteRestaurants: currentFavourites?.filter(item => item.id !== restaurant.id)
            })
        } else {
            set({
                favouriteRestaurants: [...currentFavourites, restaurant] // ,productId
            })
        }
    },

    isRestaurantFavourited: (restaurant: Restaurant | undefined) => {
        if (!restaurant) return false
        const favourites: Restaurant[] = get().favouriteRestaurants ?? []
        return favourites.some(item => item.id === restaurant.id)
    },
}))

export default useProductStore