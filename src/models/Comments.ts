import {User} from './User';

export interface IComment {
    _id: string
    item: string
    user: User
    text: string
    created: string
    updated: string
}