import {AxiosResponse} from 'axios';
import api from '../http';
import {Item, RequestItemType} from '../models/Item';

export class ItemService {
    static async fetchItems(cId: string, sort?: string): Promise<AxiosResponse<Item[]>> {
        return api.get<Item[]>(`/item`, {
            params: {
                collectionId: cId,
                sortItem: sort
            }
        })
    }

    static async createItem(date: RequestItemType): Promise<AxiosResponse<Item[]>> {
        return api.post<Item[]>(`/item`, date)
    }

    static async updateItem(date: RequestItemType): Promise<AxiosResponse<Item[]>> {
        return api.put<Item[]>(`/item`, date)
    }

    static async deleteItem(userId: string, id: string, iId: string): Promise<AxiosResponse<Item[]>> {
        return api.delete<Item[]>(`/item`, {
            params: {
                userId: userId,
                collectionId: id,
                itemId: iId
            }
        })
    }
}