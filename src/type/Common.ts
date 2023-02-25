import {Collection} from '../models/Collection';
import {Item} from '../models/Item';

export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type LanguageType = 'ru' | 'en'

export type AuthValueType = {
    email: string
    password: string
    name?: string
}

export type CollectionsAndItemsType = {
    collections: Collection[]
    items: Item []
}