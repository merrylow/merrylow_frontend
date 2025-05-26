 const storeTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    document.cookie = `refreshToken=${refreshToken}; Path=/; Secure; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'HttpOnly' : ''}`
}

// const getAccessToken = () => localStorage.getItem('accessToken')
 const getAccessToken = () => {
     if (typeof window !== 'undefined') {
         return localStorage.getItem('accessToken')
     }
     return null
 }

const getRefreshToken = () => {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('refreshToken='))
    return cookie ? cookie.split('=')[1] : null
}

const clearTokens = () => {
    localStorage.removeItem('accessToken')
    document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export { storeTokens, getAccessToken, getRefreshToken, clearTokens }