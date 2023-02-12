import {Collection} from '../../models/Collection';
import {ActionCollectionType} from '../type/collectionType';

const initialState = {
    collections: [] as Collection[],
}

type InitialStateType = typeof initialState

export const collectionReducer = (state = initialState, action: ActionCollectionType): InitialStateType => {
    switch (action.type) {
        case 'USER/SET-COLLECTIONS': {
            return {...state, collections: action.collections}
        }
        default:
            return state
    }
}

