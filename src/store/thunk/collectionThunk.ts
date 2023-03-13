import axios from 'axios'

import { RequestCollectionType } from 'models'
import { CollectionService } from 'service'
import { setCollections, setError, setStatus } from 'store/action'
import { AppThunk } from 'type'

export const fetchCollections =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatus('loading'))
      const res = await CollectionService.fetchCollections(id)

      dispatch(setCollections(res.data))
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

export const createCollection =
  (date: RequestCollectionType, id: string): AppThunk =>
  async (dispatch, getState) => {
    const imgUrl = getState().collection.imageUrl

    try {
      dispatch(setStatus('loading'))
      const res = await CollectionService.createCollection({ ...date, image: imgUrl }, id)

      dispatch(setCollections(res.data))
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

export const updateCollection =
  (date: RequestCollectionType, uId: string): AppThunk =>
  async (dispatch, getState) => {
    const imgUrl = getState().collection.imageUrl

    try {
      dispatch(setStatus('loading'))
      const res = await CollectionService.updateCollection({ ...date, image: imgUrl }, uId)

      dispatch(setCollections(res.data))
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

export const deleteCollection =
  (userId: string, id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatus('loading'))
      const res = await CollectionService.deleteCollection(userId, id)

      dispatch(setCollections(res.data))
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
