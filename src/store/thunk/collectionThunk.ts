import {AppThunk} from '../../type/Store';
import axios from 'axios';
import {setStatus} from '../action/appAction';
import {CollectionService} from '../../service/CollectionService';
import {setCollections} from '../action/collectionAction';

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