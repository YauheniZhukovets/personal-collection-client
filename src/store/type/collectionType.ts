import { setCollections, setImageUrl, setMaxItemsCollections } from 'store/action'

export type SetCollectionsType = ReturnType<typeof setCollections>
export type SetMaxItemsCollectionsType = ReturnType<typeof setMaxItemsCollections>
export type SetImageUrlType = ReturnType<typeof setImageUrl>

export type ActionCollectionType = SetCollectionsType | SetImageUrlType | SetMaxItemsCollectionsType
