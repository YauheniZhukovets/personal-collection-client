import { User } from 'models'

export interface IComment {
  _id: string
  item: string
  user: User
  text: string
  created: string
  updated: string
}
