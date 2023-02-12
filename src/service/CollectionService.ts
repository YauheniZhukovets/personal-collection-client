import {AxiosResponse} from 'axios';
import api from '../http';
import {Collection} from '../models/Collection';

export class CollectionService {
    static async fetchCollections(userId:string): Promise<AxiosResponse<Collection[]>> {
        return api.get<Collection[]>(`/collection?userId=${userId}`)
    }

    static async createCollection(): Promise<AxiosResponse<Collection[]>> {
        return api.post<Collection[]>('/collection', {})
    }

    static async updateCollection(): Promise<AxiosResponse<Collection[]>> {
        return api.put<Collection[]>('/collection', {})
    }

    static async deleteCollection(): Promise<AxiosResponse<Collection[]>> {
        return api.delete<Collection[]>('/collection')
    }
}