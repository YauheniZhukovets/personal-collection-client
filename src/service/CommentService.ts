import { AxiosResponse } from 'axios'

import api from '../http'

import { IComment } from 'models'

export class CommentService {
  static async fetchComments(iId: string): Promise<AxiosResponse<IComment[]>> {
    return api.get<IComment[]>(`/comment?itemId=${iId}`)
  }

  static async createComments(text: string, iId: string): Promise<AxiosResponse<IComment[]>> {
    return api.post<IComment[]>(`/comment?itemId=${iId}`, { text })
  }

  static async updateComment(
    iId: string,
    commentId: string,
    text: string
  ): Promise<AxiosResponse<IComment[]>> {
    return api.put<IComment[]>(
      `/comment`,
      { text },
      {
        params: {
          itemId: iId,
          commentId,
        },
      }
    )
  }

  static async deleteComment(iId: string, commentId: string): Promise<AxiosResponse<IComment[]>> {
    return api.delete<IComment[]>('/comment', {
      params: {
        itemId: iId,
        commentId,
      },
    })
  }
}
