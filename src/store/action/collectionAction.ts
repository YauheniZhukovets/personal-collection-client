import {Collection} from '../../models/Collection';

export const setCollections = (collections: Collection[]) => {
    return {type: 'USER/SET-COLLECTIONS', collections} as const
}
