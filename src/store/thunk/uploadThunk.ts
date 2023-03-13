import { RcFile } from 'antd/es/upload'
import axios from 'axios'

import { UploadService } from 'service'
import { setError, setStatus, setImageUrl } from 'store/action'
import { AppThunk } from 'type'

export const uploadImage =
  (file: RcFile): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatus('loading'))
      const res = await UploadService.uploadImage(file)

      dispatch(setImageUrl(res.data.url.toString()))
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
