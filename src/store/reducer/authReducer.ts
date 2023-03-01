import {User} from '../../models/User';
import {ActionAuthType} from '../type/authType';

const initialState = {
    user: {} as User,
    isAuth: false,
    isInitialize: false
}

export type InitialStateAuthType = typeof initialState

export const authReducer = (state = initialState, action: ActionAuthType): InitialStateAuthType => {
    switch (action.type) {
        case 'AUTH/SET-AUTH': {
            return {...state, isAuth: action.isAuth}
        }
        case 'AUTH/SET-USER': {
            return {...state, user: action.user}
        }
        case 'AUTH/SET-INITIALIZE': {
            return {...state, isInitialize: true}
        }
        default:
            return state
    }
}

