import axios from 'axios'
import { getAccessToken, getRefreshToken, storeTokens, clearTokens } from '../auth'

const axiosApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true
})

axiosApi.interceptors.request.use(config => {
    const token = getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

axiosApi.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = getRefreshToken()
                const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`,
                    { refreshToken }
                )

                storeTokens(data.accessToken, data.refreshToken)
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
                return axiosApi(originalRequest)
            } catch (refreshError) {
                clearTokens()
                window.location.href = '/auth/sign-in'
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosApi