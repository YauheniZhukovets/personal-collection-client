import { AxiosResponse } from 'axios'

import api from '../http'

import { AuthResponse } from 'models'

export class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/auth/login', { email, password })
  }

  static async registration(
    name: string | undefined,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/auth/registration', { email, password, name })
  }

  static async logout(): Promise<void> {
    return api.post('/auth/logout')
  }
}
