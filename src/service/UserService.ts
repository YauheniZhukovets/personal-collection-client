import {AxiosResponse} from 'axios';
import api from '../http';
import {User} from '../models/User';

export class UserService {
    static async fetchUsers(): Promise<AxiosResponse<User[]>> {
        return api.get<User[]>('/user')
    }

    static async blockUser(ids: string[]): Promise<AxiosResponse<User[]>> {
        return api.post<User[]>('/user/block', {ids})
    }

    static async unblockUser(ids: string[]): Promise<AxiosResponse<User[]>> {
        return api.post<User[]>('/user/unblock', {ids})
    }

    static async deleteUser(ids: string[]): Promise<AxiosResponse<User[]>> {
        return api.post<User[]>('/user/delete', {ids})
    }
}