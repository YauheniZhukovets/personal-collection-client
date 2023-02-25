import {User} from './User';
import {NullAnd} from '../type/NullAnd';

export interface Collection {
    _id: string
    user: User
    name: string
    theme: string
    description: string
    itemsCount: number
    image?: string
    fields?: string[]
    created: Date
    updated: Date
}

export type RequestCollectionType = {
    _id?: string
    name: string
    theme: string
    description: string
    image: NullAnd<string>
    fields?: string[]
}
