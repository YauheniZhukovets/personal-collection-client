import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { store } from 'store'
import {
  ActionAppType,
  ActionAuthType,
  ActionCollectionType,
  ActionCommentsType,
  ActionItemType,
  ActionUserType,
} from 'store/type'

export type AppAction =
  | ActionUserType
  | ActionAuthType
  | ActionAppType
  | ActionCollectionType
  | ActionItemType
  | ActionCommentsType
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppAction>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppAction
>
