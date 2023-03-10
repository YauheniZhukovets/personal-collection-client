import { AxiosResponse } from 'axios'

import api from '../http'

import { Collection, RequestCollectionType } from 'models'

export class CollectionService {
  static async fetchCollections(userId: string): Promise<AxiosResponse<Collection[]>> {
    return api.get<Collection[]>(`/collection?userId=${userId}`)
  }

  static async createCollection(
    date: RequestCollectionType,
    id: string
  ): Promise<AxiosResponse<Collection[]>> {
    return api.post<Collection[]>(`/collection?userId=${id}`, date)
  }

  static async updateCollection(
    date: RequestCollectionType,
    uId: string
  ): Promise<AxiosResponse<Collection[]>> {
    return api.put<Collection[]>(`/collection?userId=${uId}`, date)
  }

  static async deleteCollection(userId: string, id: string): Promise<AxiosResponse<Collection[]>> {
    return api.delete<Collection[]>('/collection', {
      params: {
        userId: userId,
        collectionId: id,
      },
    })
  }
}
