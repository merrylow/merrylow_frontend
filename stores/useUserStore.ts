import { create } from 'zustand'
import { UserState } from '@/lib/typeDefs'
import { storeTokens, getAccessToken } from '@/lib/auth'
import axios from 'axios'
// import axiosInstance from '@/lib/interceptors/axios'


// const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.NEXT_PUBLIC_API_URL
const API_URL = process.env.NEXT_PUBLIC_API_URL

const useUserStore = create<UserState>((set, get) => ({
    loading: false,
    user: null,
    fetchUser: async () => {
        set({ loading: true })
        const accessToken = getAccessToken()

        try {
            const response = await axios.get(`${API_URL}/api/account`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const userDetails = response.data.user
            // console.log(response)
            // console.log(response.data)

            if (userDetails) {
                set({
                    user: userDetails,
                    isAuthenticated: true,
                });
            } else {
                set({
                    user: null,
                    isAuthenticated: false,
                });
            }
        } catch (error) {
            console.error('Error in setUser', error);
            set({
                user: null,
                isAuthenticated: false,
            });
        } finally {
             set({ loading: false })
        }
    },
    isAuthenticated: false,
    setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))

export default useUserStore