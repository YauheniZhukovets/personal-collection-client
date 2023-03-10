import { Collection } from 'models'
import { ActionCollectionType } from 'store/type'
import { NullAnd } from 'type'

const initialState = {
  collections: [] as Collection[],
  maxItemCollections: [] as Collection[],
  imageUrl: null as NullAnd<string>,
}

type InitialStateType = typeof initialState

export const collectionReducer = (
  state = initialState,
  action: ActionCollectionType
): InitialStateType => {
  switch (action.type) {
    case 'COLLECTION/SET-COLLECTIONS': {
      return { ...state, collections: action.collections }
    }
    case 'COLLECTION/SET-URL-IMAGE': {
      return { ...state, imageUrl: action.imgUrl }
    }
    case 'COLLECTION/SET-MAX-ITEMS-COLLECTIONS': {
      return { ...state, maxItemCollections: action.collections }
    }
    default:
      return state
  }
}
