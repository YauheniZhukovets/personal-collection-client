import { setItem, setItems, setLatestItems, setSearchItems } from 'store/action'

export type SetItemsType = ReturnType<typeof setItems>
export type SetItemType = ReturnType<typeof setItem>
export type SetLatestItemsType = ReturnType<typeof setLatestItems>
export type SetSearchItemsType = ReturnType<typeof setSearchItems>

export type ActionItemType = SetItemsType | SetItemType | SetLatestItemsType | SetSearchItemsType
