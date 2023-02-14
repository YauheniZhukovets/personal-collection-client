import {Collection} from '../../models/Collection';

export const setCollections = (collections: Collection[]) => {
    return {type: 'COLLECTION/SET-COLLECTIONS', collections} as const
}

export const setImageUrl = (imgUrl: string) => {
    return {type: 'COLLECTION/SET-URL-IMAGE', imgUrl} as const
}



