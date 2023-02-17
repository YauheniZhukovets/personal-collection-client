import {AppThunk} from '../../type/Store';
import axios from 'axios';
import {setStatus} from '../action/appAction';
import {ItemService} from '../../service/ItemService';
import {setItems} from '../action/itemAction';
import {RequestItemType} from '../../models/Item';

export const fetchItems = (cId: string, sort?: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await ItemService.fetchItems(cId, sort)
        dispatch(setItems(res.data))
        dispatch(setStatus('succeeded'))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
        dispatch(setStatus('failed'))
    }
}

export const createItem = (data: RequestItemType): AppThunk => async (dispatch) => {
    try {
        dispatch(setStatus('loading'))
        const res = await ItemService.createItem(data)
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