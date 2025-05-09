import axios from 'axios'
import { Product, Restaurant } from '@/lib/typeDefs'

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
        >(`${process.env.NEXT_PUBLIC_API_URL}/api/restaurant`)

        if (!restaurantsResponse.data.success) {
            throw new Error(`Failed to fetch restaurants: ${restaurantsResponse.status}`)
        }
        const restaurants: Restaurant[] = restaurantsResponse.data.data

        const allProducts: Product[] = []
        let page = 1
        const limit = 50 // adjust as needed based on API limits
        let totalFetched = 0
        let keepFetching = true

        while (keepFetching) {
            const productsResponse = await axios.get<{
                page: number
                limit: number
                products: Product[]
            }>(`${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${page}&limit=${limit}`)

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
};

export default fetchRestaurantsAndProducts