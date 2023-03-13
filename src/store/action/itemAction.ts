import { Item } from 'models'

export const setItems = (items: Item[]) => {
  return { type: 'ITEM/SET-ITEMS', items } as const
}
export const setItem = (item: Item) => {
  return { type: 'ITEM/SET-ITEM', item } as const
}
export const setLatestItems = (items: Item[]) => {
  return { type: 'ITEM/SET-LATEST-ITEM', items } as const
}
export const setSearchItems = (items: Item[]) => {
  return { type: 'ITEM/SET-SEARCH-ITEMS', items } as const
}
