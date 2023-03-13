import axios from 'axios'

import { CollectionAndItemsService, ItemService, TagService } from 'service'
import {
  setError,
  setStatus,
  setTags,
  setMaxItemsCollections,
  setLatestItems,
  setSearchItems,
} from 'store/action'
import { AppThunk } from 'type'

export const fetchCollectionsAndItems = (): AppThunk => async dispatch => {
  try {
    dispatch(setStatus('loading'))
    const res = await CollectionAndItemsService.fetchCollectionsAndItem()

    dispatch(setMaxItemsCollections(res.data.collections))
    dispatch(setLatestItems(res.data.items))
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

export const fetchSearchItems =
  (searchText?: string): AppThunk =>
  async (dispatch, getState) => {
    const tags = getState().app.selectedTags

    try {
      const res = await ItemService.fetchItems(undefined, searchText, tags)

      dispatch(setSearchItems(res.data))
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

export const fetchTags = (): AppThunk => async dispatch => {
  try {
    const res = await TagService.fetchTags()

    dispatch(setTags(res.data))
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
