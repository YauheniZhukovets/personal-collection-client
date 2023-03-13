import axios from 'axios'

import { logout } from './authThunk'

import { UserService } from 'service'
import { setError, setStatus, setUsers } from 'store/action'
import { AppThunk } from 'type'

export const fetchUsers = (): AppThunk => async dispatch => {
  try {
    const res = await UserService.fetchUsers()

    dispatch(setUsers(res.data))
    dispatch(setStatus('succeeded'))
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const error = e.response
        ? e.response?.data?.message
        : e.message + ', more details in the console'

      dispatch(setError(error))
    }
    dispatch(setStatus('failed'))
  }
}

export const banedUser =
  (ids: string[]): AppThunk =>
  async (dispatch, getState) => {
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
        const error = e.response
          ? e.response?.data?.message
          : e.message + ', more details in the console'

        dispatch(setError(error))
      }
      dispatch(setStatus('failed'))
    }
  }

export const unBanedUser =
  (ids: string[]): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatus('loading'))
      const res = await UserService.unblockUser(ids)

      dispatch(setUsers(res.data))
      dispatch(setStatus('succeeded'))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e.response
          ? e.response?.data?.message
          : e.message + ', more details in the console'

        dispatch(setError(error))
      }
      dispatch(setStatus('failed'))
    }
  }

export const removeUser =
  (ids: string[]): AppThunk =>
  async (dispatch, getState) => {
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
        const error = e.response
          ? e.response?.data?.message
          : e.message + ', more details in the console'

        dispatch(setError(error))
      }
      dispatch(setStatus('failed'))
    }
  }

export const removeAdminUser =
  (ids: string[]): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatus('loading'))
      const res = await UserService.removeAdminUser(ids)

      dispatch(setUsers(res.data))
      dispatch(setStatus('succeeded'))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e.response
          ? e.response?.data?.message
          : e.message + ', more details in the console'

        dispatch(setError(error))
      }
      dispatch(setStatus('failed'))
    }
  }

export const makeAdminUser =
  (ids: string[]): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatus('loading'))
      const res = await UserService.makeAdminUser(ids)

      dispatch(setUsers(res.data))
      dispatch(setStatus('succeeded'))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e.response
          ? e.response?.data?.message
          : e.message + ', more details in the console'

        dispatch(setError(error))
      }
      dispatch(setStatus('failed'))
    }
  }
