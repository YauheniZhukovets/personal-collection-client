import {AppThunk} from '../../type/Store';
import axios from 'axios';
import {setStatus} from '../action/appAction';
import {LikeService} from '../../service/LikeService';
import {fetchItem} from './itemThunk';

export const likeItem = (cId: string, iId: string): AppThunk => async (dispatch) => {
    try {
        await LikeService.likeItem(iId)
        dispatch(fetchItem(cId, iId))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const dislikeItem = (cId: string, iId: string): AppThunk => async (dispatch) => {
    try {
        await LikeService.dislikeItem(iId)
        dispatch(fetchItem(cId, iId))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}