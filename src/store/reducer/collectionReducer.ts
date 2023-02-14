import {Collection} from '../../models/Collection';
import {ActionCollectionType} from '../type/collectionType';

const initialState = {
    collections: [] as Collection[],
    imageUrl: ''
}

type InitialStateType = typeof initialState

export const collectionReducer = (state = initialState, action: ActionCollectionType): InitialStateType => {
    switch (action.type) {
        case 'COLLECTION/SET-COLLECTIONS': {
            return {...state, collections: action.collections}
        }
        case 'COLLECTION/SET-URL-IMAGE': {
            return {...state, imageUrl: action.imgUrl }
        }
        default:
            return state
    }
}

