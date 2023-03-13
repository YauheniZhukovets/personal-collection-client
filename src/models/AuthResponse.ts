import { User } from 'models'

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}
