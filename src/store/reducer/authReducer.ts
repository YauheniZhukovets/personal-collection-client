import {User} from '../../models/User';
import {ActionAuthType} from '../type/authType';

const initialState = {
    user: {} as User,
    isAuth: false,
    isLoading: false
}

type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: ActionAuthType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-AUTH': {
            return {...state, isAuth: action.isAuth}
        }
        case 'AUTH/SET-USER': {
            return {...state, user: action.user}
        }
        case 'AUTH/SET-LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        default:
            return state
    }
}

