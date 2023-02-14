import {store} from '../store/store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ActionUserType} from '../store/type/userType';
import {ActionAuthType} from '../store/type/authType';
import {ActionAppType} from '../store/type/appType';
import {ActionCollectionType} from '../store/type/collectionType';


export type AppAction = ActionUserType | ActionAuthType | ActionAppType | ActionCollectionType
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppAction>