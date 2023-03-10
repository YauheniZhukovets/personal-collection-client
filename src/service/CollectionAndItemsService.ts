import { AxiosResponse } from 'axios'

import api from '../http'

import { CollectionsAndItemsType } from 'type'

export class CollectionAndItemsService {
  static async fetchCollectionsAndItem(): Promise<AxiosResponse<CollectionsAndItemsType>> {
    return api.get<CollectionsAndItemsType>(`/all`)
  }
}
