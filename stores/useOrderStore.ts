// import axios from 'axios'
import axiosInstance from '@/lib/interceptors/axios'
import { create } from 'zustand'
import { Order, OrderStore } from '@/lib/typeDefs'
import { toast } from 'sonner'
import { fetchOrders } from '@/lib/api' // Import your API function

const API_URL = process.env.NEXT_PUBLIC_API_URL

const useOrderStore = create<OrderStore>((set, get) => ({
    loading: false,
    error: false,
    orders: [],

    fetchOrders: async () => {
        set({ loading: true, error: false })

        try {
            const fetchedOrders = await fetchOrders()
            console.log('Fetched orders:', fetchedOrders)

            set({
                orders: fetchedOrders,
                loading: false
            })

            // return orders
        } catch (error) {
            console.error('Failed to fetch orders:', error)
            set({
                error: true,
                loading: false,
                orders: []
            })
            toast.error('Failed to load your orders')
            // return []
        } finally {
            set({ loading: false })
        }
    },

    // function to get a single order by id
    // getOrderById: (orderId: string) => {
    //     return get().orders.find(order => order.id === orderId)
    // }
}))

export default useOrderStore