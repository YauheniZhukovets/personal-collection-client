import axios from 'axios'
import {AuthResponse} from '../models/AuthResponse';

const api = axios.create({
    //https://personal-collection-server.vercel.app/api
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const res = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/auth/refresh`)
            localStorage.setItem('token', res.data.accessToken)
            return api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    throw error
})

export default api
