// import axios, { AxiosError } from 'axios'
// import { getAccessToken, getRefreshToken, storeTokens, clearTokens } from '../auth'
//
// declare module 'axios' {
//     interface AxiosRequestConfig {
//         _retry?: boolean;
//     }
// }
//
// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     // withCredentials: true, // only if using cookies
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//     },
// })
//
// // request interceptor: attach access token
// axiosInstance.interceptors.request.use((config) => {
//     const token = getAccessToken()
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })
//
// // response interceptor: handles token refresh
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//         const originalRequest = error.config
//
//         // only retry 401 errors (unauthorized) once
//         if (typeof window !== 'undefined' && error.response?.status === 401 && !originalRequest?._retry) {
//             originalRequest._retry = true
//
//             try {
//                 const refreshToken = getRefreshToken()
//                 if (!refreshToken) throw new Error('No refresh token')
//
//                 // Refresh tokens
//                 const { data } = await axios.post(
//                     `${process.env.NEXT_PUBLIC_API_URL}/api/refresh`,
//                     { refreshToken },
//                     { headers: { 'Content-Type': 'application/json' } }
//                 )
//
//                 // stores new tokens and retry
//                 storeTokens(data.accessToken, data.refreshToken)
//                 originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
//                 return axiosInstance(originalRequest)
//             } catch (refreshError) {
//                 clearTokens()
//                 window.location.href = '/auth/sign-in' // redirects to login page
//                 return Promise.reject(refreshError)
//             }
//         }
//
//         return Promise.reject(error)
//     }
// )
//
// export default axiosInstance









import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, storeTokens, clearTokens } from '../auth';

declare module 'axios' {
    interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Only handle 401 errors when we have a request config
        if (typeof window !== 'undefined' &&
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = getRefreshToken();
                if (!refreshToken) throw new Error('No refresh token');

                const { data } = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/refresh`,
                    { refreshToken },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                storeTokens(data.accessToken, data.refreshToken);
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                clearTokens();
                window.location.href = '/auth/sign-in';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;