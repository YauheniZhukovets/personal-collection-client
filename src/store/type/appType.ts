import {setStatus, setLanguage} from '../action/appAction';

export type SetStatusType = ReturnType<typeof setStatus>
export type SetLanguageType = ReturnType<typeof setLanguage>

export type ActionAppType = SetStatusType | SetLanguageType
