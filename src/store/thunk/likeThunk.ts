import {AppThunk} from '../../type/Store';
import axios from 'axios';
import {setError, setStatus} from '../action/appAction';
import {LikeService} from '../../service/LikeService';
import {fetchItem} from './itemThunk';

export const likeItem = (cId: string, iId: string): AppThunk => async (dispatch) => {
    try {
        await LikeService.likeItem(iId)
        dispatch(fetchItem(cId, iId))
        dispatch(setStatus('succeeded'))
        dispatch(setError(null))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(setError(e.response?.data?.message))
        }
        dispatch(setStatus('failed'))
    }
}

export const dislikeItem = (cId: string, iId: string): AppThunk => async (dispatch) => {
    try {
        await LikeService.dislikeItem(iId)
        dispatch(fetchItem(cId, iId))
        dispatch(setStatus('succeeded'))
        dispatch(setError(null))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(setError(e.response?.data?.message))
        }
        dispatch(setStatus('failed'))
    }
}