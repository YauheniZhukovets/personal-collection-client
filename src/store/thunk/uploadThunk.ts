import {AppThunk} from '../../type/Store';
import axios from 'axios';
import {setError, setStatus} from '../action/appAction';
import {setImageUrl} from '../action/collectionAction';
import {UploadService} from '../../service/UploadService';
import {RcFile} from 'antd/es/upload';

export const uploadImage = (file: RcFile): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await UploadService.uploadImage(file)
        dispatch(setImageUrl(res.data.url.toString()))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e.response ? e.response?.data?.message : (e.message + ', more details in the console')
            dispatch(setError(error))        }
        dispatch(setStatus('failed'))
    }
}