import { setAuth, setInitialize, setUser } from 'store/action'

export type SetAuthType = ReturnType<typeof setAuth>
export type SetUserType = ReturnType<typeof setUser>
export type SetInitializeType = ReturnType<typeof setInitialize>

export type ActionAuthType = SetAuthType | SetUserType | SetInitializeType
