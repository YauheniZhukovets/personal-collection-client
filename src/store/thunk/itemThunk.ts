import {AppThunk} from '../../type/Store';
import axios from 'axios';
import {setStatus} from '../action/appAction';
import {ItemService} from '../../service/ItemService';
import {setItem, setItems} from '../action/itemAction';
import {RequestItemType} from '../../models/Item';

export const fetchItems = (cId?: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await ItemService.fetchItems(cId)
        dispatch(setItems(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const fetchItem = (cId: string, iId:string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await ItemService.fetchItem(cId, iId)
        dispatch(setItem(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}


export const createItem = (data: RequestItemType, uId:string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await ItemService.createItem(data, uId)
        dispatch(setItems(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const updateItem = (data: RequestItemType, uId:string, iId:string ): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await ItemService.updateItem(data, uId, iId)
        dispatch(setItems(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const deleteItem = (id: string, cId: string, iId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await ItemService.deleteItem(id, cId, iId)
        dispatch(setItems(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}