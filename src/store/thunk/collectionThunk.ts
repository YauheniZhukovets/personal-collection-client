import {AppThunk} from '../../type/Store';
import axios from 'axios';
import {setStatus} from '../action/appAction';
import {CollectionService} from '../../service/CollectionService';
import {setCollections} from '../action/collectionAction';
import {RequestCollectionType} from '../../models/Collection';

export const fetchCollections = (id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await CollectionService.fetchCollections(id)
        dispatch(setCollections(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const createCollection = (date: RequestCollectionType, id: string): AppThunk => async (dispatch, getState) => {
    const imgUrl = getState().collection.imageUrl
    try {
        dispatch(setStatus('loading'))
        const res = await CollectionService.createCollection({...date, image: imgUrl}, id)
        dispatch(setCollections(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const updateCollection = (date: RequestCollectionType, uId: string): AppThunk => async (dispatch, getState) => {
    const imgUrl = getState().collection.imageUrl
    try {
        dispatch(setStatus('loading'))
        const res = await CollectionService.updateCollection({...date, image: imgUrl}, uId)
        dispatch(setCollections(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const deleteCollection = (userId: string, id:string ): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await CollectionService.deleteCollection(userId, id)
        dispatch(setCollections(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}