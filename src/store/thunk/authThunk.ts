import {AppThunk} from '../../type/Store';
import {AuthService} from '../../service/AuthService';
import {setAuth, setInitialize, setUser} from '../action/authAction';
import axios from 'axios';
import {User} from '../../models/User';
import {AuthResponse} from '../../models/AuthResponse';
import {setError, setStatus} from '../action/appAction';

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await AuthService.login(email, password)
        localStorage.setItem('token', res.data.accessToken)
        dispatch(setAuth(true))
        dispatch(setUser(res.data.user))
        dispatch(setStatus('succeeded'))
        dispatch(setError(null))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(setError(e.response?.data?.message))
        }
        dispatch(setStatus('failed'))
    }
}

export const registration = (email: string, name: string | undefined, password: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await AuthService.registration(name, email, password)
        localStorage.setItem('token', res.data.accessToken)
        dispatch(setAuth(true))
        dispatch(setUser(res.data.user))
        dispatch(setStatus('succeeded'))
        dispatch(setError(null))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(setError(e.response?.data?.message))
        }
        dispatch(setStatus('failed'))
    }
}

export const logout = (): AppThunk => async (dispatch) => {

    try {
        dispatch(setStatus('loading'))
        await AuthService.logout()
        localStorage.removeItem('token')
        dispatch(setAuth(false))
        dispatch(setUser({} as User))
        dispatch(setStatus('succeeded'))
        dispatch(setError(null))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(setError(e.response?.data?.message))
        }
        dispatch(setStatus('failed'))
    }
}

export const checkAuth = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/auth/refresh`, {withCredentials: true})
        localStorage.setItem('token', res.data.accessToken)
        dispatch(setAuth(true))
        dispatch(setUser(res.data.user))
        dispatch(setStatus('succeeded'))
        dispatch(setError(null))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    } finally {
        dispatch(setInitialize())
    }
}