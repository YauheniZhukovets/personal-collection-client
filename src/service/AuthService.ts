import api from '../http';
import {AxiosResponse} from 'axios';
import {AuthResponse} from '../models/AuthResponse';

export class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return api.post('/logout',)
    }

    static async checkMe(): Promise<AxiosResponse<AuthResponse>> {
        console.log(' auth service checkMe ')
        return api.get<AuthResponse>('/refresh')
    }
}