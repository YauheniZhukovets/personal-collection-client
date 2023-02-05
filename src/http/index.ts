import axios from 'axios'

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    console.log(`interceptor req ${token}`)
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config
    console.log(`до try ${JSON.stringify(originalRequest)}`)
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        console.log(error.response.status === 401)
        console.log(error.config)
        console.log(error.config._isRetry)
        originalRequest._isRetry = true
        try {
            console.log(`в try `)
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {withCredentials: true})
            console.log(`res data ${JSON.stringify(res)}`)
            localStorage.setItem('token', res.data.accessToken)
            return api.request(originalRequest)
        } catch (e) {
            console.log('Не авторизован interceptor res')
        }
    }
    throw Error
})

export default api
