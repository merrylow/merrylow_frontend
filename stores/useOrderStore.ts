import axios from 'axios'
import axiosInstance from '@/lib/interceptors/axios'
import { create } from 'zustand'
import { Order, OrderStore } from '@/lib/typeDefs'
import { toast } from 'sonner'
import { getAccessToken } from '@/lib/auth'
import { fetchOrders } from '@/lib/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const useOrderStore = create<OrderStore>((set, get) => ({
    loading: false,
    error: false,
    orders: [],


    fetchOrders: async () => {
        set({ loading: true, error: false })
        try {
            const accessToken = getAccessToken()
            const response = await axiosInstance.get(`${API_URL}/api/order`)

            console.log('Orders response', response)

            const ordersData = response.data?.data || []
            set({
                orders: Array.isArray(ordersData) ? ordersData : [],
                loading: false
            });
            return ordersData
        } catch (error) {
            console.error('Failed to fetch orders:', error)
            set({
                error: true,
                loading: false,
                orders: []
            })
            toast.error('Failed to load your orders')
            throw error
        }
    },


    formatOrderDate: (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', '')
    }

    // function to get a single order by id
    // getOrderById: (orderId: string) => {
    //     return get().orders.find(order => order.id === orderId)
    // }
}))

export default useOrderStore