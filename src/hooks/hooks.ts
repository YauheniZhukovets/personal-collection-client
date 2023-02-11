import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../type/Store';


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector