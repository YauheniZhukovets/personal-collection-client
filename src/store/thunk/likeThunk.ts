import axios from 'axios'

import { fetchItem } from './itemThunk'

import { LikeService } from 'service'
import { setError, setStatus } from 'store/action'
import { AppThunk } from 'type'

export const likeItem =
  (cId: string, iId: string): AppThunk =>
  async dispatch => {
    try {
      await LikeService.likeItem(iId)
      dispatch(fetchItem(cId, iId))
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

export const dislikeItem =
  (cId: string, iId: string): AppThunk =>
  async dispatch => {
    try {
      await LikeService.dislikeItem(iId)
      dispatch(fetchItem(cId, iId))
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
