import axios from 'axios'
import { Product, Restaurant } from '@/lib/typeDefs'


// const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NEXT_PUBLIC_API_URL
const API_URL= process.env.NEXT_PUBLIC_API_URL

const fetchRestaurantsAndProducts = async (): Promise<{
    restaurants: Restaurant[]
    products: Product[]
}> => {

    try {
        const restaurantsResponse = await axios.get<
            {
                success: boolean;
                data: Restaurant[]
            }
        >(`${API_URL}/api/restaurants`)

        if (!restaurantsResponse.data.success) {
            throw new Error(`Failed to fetch restaurants: ${restaurantsResponse.status}`)
        }
        const restaurants: Restaurant[] = restaurantsResponse.data.data

        const allProducts: Product[] = []
        let page = 1
        const limit = 50 //change this later if it's changed in the backend
        let totalFetched = 0
        let keepFetching = true

        while (keepFetching) {
            const productsResponse = await axios.get<{
                page: number
                limit: number
                products: Product[]
            }>(`${API_URL}/api/products?page=${page}&limit=${limit}`)

            const { products } = productsResponse.data
            allProducts.push(...products)
            totalFetched += products.length

            if (products.length < limit) {
                keepFetching = false
            } else {
                page++
            }
        }

        return {
            restaurants,
            products: allProducts
        }

    } catch (error: any) {
        console.error('Error fetching stores and products:', error.message)
        return { restaurants: [], products: [] }
    }
}



const fetchTopRestaurants = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/top-vendors`)
        const restaurantsResponse: Restaurant[] = response.data.data

        return restaurantsResponse
    } catch (error) {
        console.error('Error fetching top vendors:', error)
        throw new Error('Failed to fetch top restaurants')
    }
}


const fetchTopProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/top-products`)
        const productsResponse: Product[] = response.data.data

        return productsResponse
    } catch(error) {
        console.error('Error fetching top products', error)
        throw new Error('Failed to fetch top products')
    }
}

export { fetchRestaurantsAndProducts, fetchTopRestaurants, fetchTopProducts }