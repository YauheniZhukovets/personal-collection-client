import {Collection} from '../../models/Collection';
import {ActionCollectionType} from '../type/collectionType';
import {NullAnd} from '../../type/NullAnd';

const initialState = {
    collections: [] as Collection[],
    imageUrl: null as NullAnd<string>
}

type InitialStateType = typeof initialState

export const collectionReducer = (state = initialState, action: ActionCollectionType): InitialStateType => {
    switch (action.type) {
        case 'COLLECTION/SET-COLLECTIONS': {
            return {...state, collections: action.collections}
        }
        case 'COLLECTION/SET-URL-IMAGE': {
            return {...state, imageUrl: action.imgUrl}
        }
        default:
            return state
    }
}

