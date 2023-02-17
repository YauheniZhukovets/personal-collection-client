import {Item} from '../../models/Item';

export const setItems = (items: Item[]) => {
    return {type: 'ITEM/SET-ITEMS', items} as const
}