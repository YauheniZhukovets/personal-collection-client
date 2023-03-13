import { IComment } from 'models'

export const setComments = (comments: IComment[]) => {
  return { type: 'COMMENTS/SET-COMMENTS', comments } as const
}
