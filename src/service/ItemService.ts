import { AxiosResponse } from 'axios'

import api from '../http'

import { Item, RequestItemType } from 'models'

export class ItemService {
  static async fetchItems(
    cId?: string,
    search?: string,
    tags?: string[]
  ): Promise<AxiosResponse<Item[]>> {
    return api.get<Item[]>(`/item`, {
      params: {
        collectionId: cId,
        search,
        tags,
      },
    })
  }

  static async fetchItem(cId: string, iId: string): Promise<AxiosResponse<Item>> {
    return api.get<Item>(`/item/id`, {
      params: {
        collectionId: cId,
        itemId: iId,
      },
    })
  }

  static async createItem(date: RequestItemType, uId: string): Promise<AxiosResponse<Item[]>> {
    return api.post<Item[]>(`/item`, { ...date, userId: uId })
  }

  static async updateItem(
    date: RequestItemType,
    uId: string,
    iId: string
  ): Promise<AxiosResponse<Item[]>> {
    return api.put<Item[]>(`/item`, { ...date, userId: uId, itemId: iId })
  }

  static async deleteItem(userId: string, id: string, iId: string): Promise<AxiosResponse<Item[]>> {
    return api.delete<Item[]>(`/item`, {
      params: {
        userId: userId,
        collectionId: id,
        itemId: iId,
      },
    })
  }
}
