import {User} from './User';

export interface Collection {
    _id: string
    user: User
    name: string
    theme: string
    description: string
    itemsCount: number
    image?: string
    created: Date
    updated: Date
}

export type RequestCollectionType = {
    name: string
    theme: string
    description: string
    image: string
}
