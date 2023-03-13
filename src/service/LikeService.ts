import { AxiosResponse } from 'axios'

import api from '../http'

import { Like } from 'models'

export class LikeService {
  static async likeItem(iId: string): Promise<AxiosResponse<Like[]>> {
    return api.post<Like[]>(
      `/like`,
      {},
      {
        params: {
          itemId: iId,
        },
      }
    )
  }

  static async dislikeItem(iId: string): Promise<AxiosResponse<Like[]>> {
    return api.delete<Like[]>(`/like`, {
      params: {
        itemId: iId,
      },
    })
  }
}
