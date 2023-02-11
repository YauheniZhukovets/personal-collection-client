import {User} from '../../models/User';

export const setAuth = (isAuth: boolean) => {
    return {type: 'AUTH/SET-AUTH', isAuth} as const
}
export const setUser = (user: User) => {
    return {type: 'AUTH/SET-USER', user} as const
}
export const setInitialize = () => {
    return {type: 'AUTH/SET-INITIALIZE'} as const
}
