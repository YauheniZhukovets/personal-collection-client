import {ActionAppType} from '../type/appType';
import {LanguageType, StatusType} from '../../type/Common';
import {Tag} from '../../models/Tag';
import {NullAnd} from '../../type/NullAnd';

const initialState = {
    status: 'idle' as StatusType,
    language: 'en' as LanguageType,
    search: '',
    tags: [] as Tag[],
    selectedTags: [] as string[],
    error: null as NullAnd<string>
}

export type InitialStateAppType = typeof initialState

export const appReducer = (state = initialState, action: ActionAppType): InitialStateAppType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-LANGUAGE': {
            return {...state, language: action.language}
        }
        case 'APP/SET-SEARCH' : {
            return {...state, search: action.search}
        }
        case 'APP/SET-TAGS' : {
            return {...state, tags: action.tags}
        }
        case 'APP/SET-SELECTED-TAGS' : {
            return {...state, selectedTags: action.tags}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

