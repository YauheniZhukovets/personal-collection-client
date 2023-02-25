import {AxiosResponse} from 'axios';
import api from '../http';
import {Like} from '../models/Like';

export class LikeService {
    static async likeItem(uId: string, iId: string): Promise<AxiosResponse<Like[]>> {
        return api.post<Like[]>(`/like`, {}, {
            params: {
                userId: uId,
                itemId: iId
            }
        })
    }

    static async dislikeItem(uId: string, iId: string): Promise<AxiosResponse<Like[]>> {
        return api.delete<Like[]>(`/like`, {
            params: {
                userId: uId,
                itemId: iId
            }
        })
    }
}