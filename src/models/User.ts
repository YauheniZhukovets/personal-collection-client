export interface User {
    _id: string
    name: string
    email: string
    collectionsCount: number
    isAdmin: boolean
    isBlocked: boolean
    created: Date
    updated: Date

}