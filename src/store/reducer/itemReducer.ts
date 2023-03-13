import { Item } from 'models'
import { ActionItemType } from 'store/type'

const initialState = {
  items: [] as Item[],
  item: {} as Item,
  latestItems: [] as Item[],
  searchItems: [] as Item[],
}

type InitialStateType = typeof initialState

export const itemReducer = (state = initialState, action: ActionItemType): InitialStateType => {
  switch (action.type) {
    case 'ITEM/SET-ITEMS': {
      return { ...state, items: action.items }
    }
    case 'ITEM/SET-ITEM': {
      return { ...state, item: action.item }
    }
    case 'ITEM/SET-LATEST-ITEM': {
      return { ...state, latestItems: action.items }
    }
    case 'ITEM/SET-SEARCH-ITEMS': {
      return { ...state, searchItems: action.items }
    }

    default:
      return state
  }
}
