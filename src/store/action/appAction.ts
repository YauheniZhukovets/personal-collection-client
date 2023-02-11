import {LanguageType, StatusType} from '../../type/Common';

export const setStatus = (status: StatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setLanguage = (language: LanguageType) => {
    return {type: 'APP/SET-LANGUAGE', language} as const
}
