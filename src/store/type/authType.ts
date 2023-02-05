import {setAuth, setLoading, setUser} from '../action/authAction';

export type SetAuthType = ReturnType<typeof setAuth>
export type SetUserType = ReturnType<typeof setUser>
export type SetLoadingType = ReturnType<typeof setLoading>

export type ActionAuthType = SetAuthType | SetUserType | SetLoadingType

