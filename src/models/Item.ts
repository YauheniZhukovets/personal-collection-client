import {User} from './User';
import {Collection} from './Collection';
import {NullAnd} from '../type/NullAnd';

export interface Item {
    _id: string
    user: User
    collectionName: Collection
    title: string
    countComments: number
    tags: string[]
    likes: any []
    string1: NullAnd<string>
    string2: NullAnd<string>
    string3: NullAnd<string>
    text1: NullAnd<string>
    text2: NullAnd<string>
    text3: NullAnd<string>
    number1: NullAnd<number>
    number2: NullAnd<number>
    number3: NullAnd<number>
    boolean1: NullAnd<boolean>
    boolean2: NullAnd<boolean>
    boolean3: NullAnd<boolean>
    date1: NullAnd<string>
    date2: NullAnd<string>
    date3: NullAnd<string>
    created: Date
    updated: Date
}

export type RequestItemType = {
    collectionId: string
    title: string
    tags: string[]
    string1?: string
    string2?: string
    string3?: string
    text1?: string
    text2?: string
    text3?: string
    number1?: number
    number2?: number
    number3?: number
    boolean1?: boolean
    boolean2?: boolean
    boolean3?: boolean
    date1: string
    date2: string
    date3: string
}
