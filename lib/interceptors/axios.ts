// import axios from 'axios'
// import { getAccessToken, getRefreshToken, storeTokens, clearTokens } from '../auth'
//
// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     withCredentials: true
// })
//
// axiosInstance.interceptors.request.use(config => {
//     const accessToken = getAccessToken()
//     if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`
//     }
//     return config
// })
//
// axiosInstance.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config
//
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true
//
//             try {
//                 const refreshToken = getRefreshToken()
//                 const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`,
//                     { refreshToken }
//                 )
//
//                 storeTokens(data.accessToken, data.refreshToken)
//                 originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
//                 return axiosApi(originalRequest)
//             } catch (refreshError) {
//                 clearTokens()
//                 window.location.href = '/auth/sign-in'
//                 return Promise.reject(refreshError)
//             }
//         }
//
//         return Promise.reject(error)
//     }
// )
//
// export default axiosInstance







//
// import axios from 'axios'
// import { getAccessToken, getRefreshToken, storeTokens, clearTokens } from '../auth'
//
// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//     },
// })
//
// // Request interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('accessToken')
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )
//
//
//
// axiosInstance.interceptors.response.use(
//     response => response,
//     async error => {
//         const originalRequest = error.config
//
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true
//
//             try {
//                 const refreshToken = getRefreshToken()
//                 const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/refresh`,
//                     { refreshToken }
//                 )
//
//                 storeTokens(data.accessToken, data.refreshToken)
//                 originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
//                 return axiosInstance(originalRequest)
//             } catch (refreshError) {
//                 clearTokens()
//                 window.location.href = '/auth/sign-in'
//                 return Promise.reject(refreshError)
//             }
//         }
//
//         return Promise.reject(error)
//     }
// )
//
//
// // Response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         // Handle 401 Unauthorized errors
//         if (error.response && error.response.status === 401) {
//             // Optionally, redirect to login page or perform logout
//             // For example:
//             // window.location.href = '/auth/sign-in';
//         }
//         return Promise.reject(error)
//     }
// )
//
// export default axiosInstance


import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

axiosInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

export default axiosInstance