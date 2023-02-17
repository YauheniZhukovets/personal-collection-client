import {Item} from '../../models/Item';
import {ActionItemType} from '../type/itemType';

const initialState = {
    items: [] as Item[],
}

type InitialStateType = typeof initialState

export const itemReducer = (state = initialState, action: ActionItemType): InitialStateType => {
    switch (action.type) {
        case 'ITEM/SET-ITEMS': {
            return {...state, items: action.items}
        }
        default:
            return state
    }
}

