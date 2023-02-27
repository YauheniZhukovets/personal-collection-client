import api from '../http';
import {AxiosResponse} from 'axios';
import {AuthResponse} from '../models/AuthResponse';

export class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/auth/login', {email, password})
    }

    static async registration(name: string | undefined, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/auth/registration', {email, password, name})
    }

    static async logout(): Promise<void> {
        return api.post('/auth/logout',)
    }

    static async google(): Promise<AxiosResponse<AuthResponse>> {
        return api.get<AuthResponse>('/auth/login/success',)
    }
}