import {ActionUserType} from '../type/userType';
import {User} from '../../models/User';

const initialState = {
    users: [] as User[],
}

type InitialStateType = typeof initialState

export const userReducer = (state = initialState, action: ActionUserType): InitialStateType => {
    switch (action.type) {
        case 'USER/SET-USERS': {
            return {...state, users: action.users}
        }
        default:
            return state
    }
}

