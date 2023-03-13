import { User } from 'models'

export const setUsers = (users: User[]) => {
  return { type: 'USER/SET-USERS', users } as const
}
