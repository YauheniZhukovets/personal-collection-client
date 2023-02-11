import {ActionAppType} from '../type/appType';
import {LanguageType, StatusType} from '../../type/Common';

const initialState = {
    status: 'idle' as StatusType,
    language: 'en' as LanguageType
}

type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: ActionAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-LANGUAGE': {
            return {...state, language: action.language}
        }
        default:
            return state
    }
}

