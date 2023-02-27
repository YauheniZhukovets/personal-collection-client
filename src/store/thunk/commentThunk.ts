import {AppThunk} from '../../type/Store';
import axios from 'axios';
import {setError, setStatus} from '../action/appAction';
import {CommentService} from '../../service/CommentService';
import {setComments} from '../action/commentsAction';

export const fetchComments = (iId: string): AppThunk => async (dispatch) => {
    try {
        const res = await CommentService.fetchComments(iId)
        dispatch(setComments(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e.response ? e.response?.data?.message : (e.message + ', more details in the console')
            dispatch(setError(error))
        }
        dispatch(setStatus('failed'))
    }
}

export const createComment = (iId: string, text: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await CommentService.createComments(text, iId)
        dispatch(setComments(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e.response ? e.response?.data?.message : (e.message + ', more details in the console')
            dispatch(setError(error))
        }
        dispatch(setStatus('failed'))
    }
}

export const updateComment = (iId: string, commentId: string, text: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await CommentService.updateComment(iId, commentId, text)
        dispatch(setComments(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e.response ? e.response?.data?.message : (e.message + ', more details in the console')
            dispatch(setError(error))
        }
        dispatch(setStatus('failed'))
    }
}

export const deleteComment = (iId: string, commentId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await CommentService.deleteComment(iId, commentId)
        dispatch(setComments(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e.response ? e.response?.data?.message : (e.message + ', more details in the console')
            dispatch(setError(error))
        }
        dispatch(setStatus('failed'))
    }
}