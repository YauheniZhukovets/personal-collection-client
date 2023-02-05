import {AppThunk} from '../../type/StoreTypes';
import {AuthService} from '../../service/AuthService';
import {setAuth, setLoading, setUser} from '../action/authAction';
import axios from 'axios';
import {User} from '../../models/User';


export const login = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        const res = await AuthService.login(email, password)
        localStorage.setItem('token', res.data.accessToken)
        dispatch(setAuth(true))
        dispatch(setUser(res.data.user))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
    }
}

export const registration = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        const res = await AuthService.registration(email, password)
        localStorage.setItem('token', res.data.accessToken)
        dispatch(setAuth(true))
        dispatch(setUser(res.data.user))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    try {
        await AuthService.logout()
        localStorage.removeItem('token')
        dispatch(setAuth(false))
        dispatch(setUser({} as User))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
    }
}

export const checkAuth = (): AppThunk => async (dispatch) => {
    console.log('thank check')
    dispatch(setLoading(true))
    try {
        console.log('try thunk')
        const res = await AuthService.checkMe()
        console.log(res)
        localStorage.setItem('token', res.data.accessToken)
        dispatch(setAuth(true))
        dispatch(setUser(res.data.user))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
    } finally {
        dispatch(setLoading(false))
    }
}