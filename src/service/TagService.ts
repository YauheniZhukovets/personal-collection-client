import { AxiosResponse } from 'axios'

import api from '../http'

import { Tag } from 'models'

export class TagService {
  static async fetchTags(): Promise<AxiosResponse<Tag[]>> {
    return api.get<Tag[]>(`/tags`)
  }
}
