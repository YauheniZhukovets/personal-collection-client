import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../type/Store';
import {useTranslation} from 'react-i18next';


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


export const useTranslateOptions = (options: any[], category: string) => {
    const {t} = useTranslation()
    return options.map((el) => {
        return {...el, value: t(`${category}.${el.value}`)}
    })
}
