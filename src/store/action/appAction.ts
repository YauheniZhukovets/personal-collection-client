import {LanguageType, StatusType} from '../../type/Common';
import {Tag} from '../../models/Tag';

export const setStatus = (status: StatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setLanguage = (language: LanguageType) => {
    return {type: 'APP/SET-LANGUAGE', language} as const
}
export const setSearchText = (search: string) => {
    return {type: 'APP/SET-SEARCH', search} as const
}
export const setTags = (tags: Tag[]) => {
    return {type: 'APP/SET-TAGS', tags} as const
}
export const setSelectedTags = (tags: string[]) => {
    return {type: 'APP/SET-SELECTED-TAGS', tags} as const
}