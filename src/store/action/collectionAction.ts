import { Collection } from 'models'
import { NullAnd } from 'type'

export const setCollections = (collections: Collection[]) => {
  return { type: 'COLLECTION/SET-COLLECTIONS', collections } as const
}
export const setMaxItemsCollections = (collections: Collection[]) => {
  return { type: 'COLLECTION/SET-MAX-ITEMS-COLLECTIONS', collections } as const
}
export const setImageUrl = (imgUrl: NullAnd<string>) => {
  return { type: 'COLLECTION/SET-URL-IMAGE', imgUrl } as const
}
