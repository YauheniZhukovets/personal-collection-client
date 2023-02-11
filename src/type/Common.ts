export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type LanguageType = 'ru' | 'en'

export type AuthValueType = {
    email: string
    password: string
    name?: string
}