import {setError, setLanguage, setSearchText, setSelectedTags, setStatus, setTags} from '../action/appAction';

export type SetStatusType = ReturnType<typeof setStatus>
export type SetLanguageType = ReturnType<typeof setLanguage>
export type SetSearchTextType = ReturnType<typeof setSearchText>
export type SetTagsType = ReturnType<typeof setTags>
export type SetSelectedTagsType = ReturnType<typeof setSelectedTags>
export type SetErrorType = ReturnType<typeof setError>

export type ActionAppType =
    SetStatusType
    | SetLanguageType
    | SetSearchTextType
    | SetTagsType
    | SetSelectedTagsType
    | SetErrorType
