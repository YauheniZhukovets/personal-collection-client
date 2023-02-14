import {setCollections, setImageUrl} from '../action/collectionAction';

export type SetCollectionsType = ReturnType<typeof setCollections>
export type SetImageUrlType = ReturnType<typeof setImageUrl>

export type ActionCollectionType = SetCollectionsType | SetImageUrlType

