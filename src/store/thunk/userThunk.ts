import {AppThunk} from '../../type/Store';
import {UserService} from '../../service/UserService';
import {setUsers} from '../action/userAction';
import axios from 'axios';
import {logout} from './authThunk';
import {setStatus} from '../action/appAction';

export const fetchUsers = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await UserService.fetchUsers()
        dispatch(setUsers(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const banedUser = (ids: string[]): AppThunk => async (dispatch, getState) => {
    const userId = getState().auth.user._id
    try {
        dispatch(setStatus('loading'))
        const res = await UserService.blockUser(ids)
        if (ids.includes(userId)) {
            dispatch(logout())
        }
        dispatch(setUsers(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const unBanedUser = (ids: string[]): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await UserService.unblockUser(ids)
        dispatch(setUsers(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const removeUser = (ids: string[]): AppThunk => async (dispatch, getState) => {
    const userId = getState().auth.user._id
    try {
        dispatch(setStatus('loading'))
        const res = await UserService.deleteUser(ids)
        if (ids.includes(userId)) {
            dispatch(logout())
        }
        dispatch(setUsers(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}
