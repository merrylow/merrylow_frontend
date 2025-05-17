import { create } from 'zustand'
import { UserState } from '@/lib/typeDefs'
import axios from 'axios'

const useUserStore = create<UserState>((set, get) => ({
    loading: false,
    user: null,
    setUser: async (user) => {
        // set({ loading: true })
        // try {
        //     const response = await axios.post
        // } catch (error) {
        //     console.error('Error in setUSer', error)
        // } finally {
        //      set({ loading: false })
        // }
        set({ user })
    },
    isAuthenticated: false,
    setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))

export default useUserStore