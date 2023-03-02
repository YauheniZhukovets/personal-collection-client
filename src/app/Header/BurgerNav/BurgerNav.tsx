import React, {FC, useState} from 'react';
import {Button, Switch} from 'antd';
import {ModalLogin} from '../../Auth/ModalLogin';
import {ModalRegistration} from '../../Auth/ModalRegistration';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {User} from '../../../models/User';
import {logout} from '../../../store/thunk/authThunk';
import {StatusType} from '../../../type/Common';
import {useTranslation} from 'react-i18next';
import closeMenu from '../../../assets/image/closeMenu.svg'
import menu from '../../../assets/image/menu.svg'
import s from './BurgerNav.module.css'


type NavType = {
    language: string
    isDarkMode: boolean
    changeTheme: () => void
    changeLanguage: () => void
}

export const BurgerNav: FC<NavType> = ({language, isDarkMode, changeLanguage, changeTheme}) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const user = useAppSelector<User>(state => state.auth.user)
    const status = useAppSelector<StatusType>(state => state.app.status)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onClickBurgerHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={s.burgerNav}>
            <div className={isOpen ? `${s.burgerNavContainer} ${s.show}` : s.burgerNavContainer}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5}}>
                    <Switch
                        checked={!isDarkMode}
                        onChange={changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                    <Switch
                        checked={language === 'en'}
                        onChange={changeLanguage}
                        checkedChildren="rus"
                        unCheckedChildren="eng"
                    />
                </div>
                {
                    user.email ?
                        <div style={{display: 'flex'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                                <div style={{color: 'lightgrey'}}>
                                    {(user.name && user.name.split(' ')[0]) || user.email.split('@')[0]}
                                </div>
                                <Button onClick={() => dispatch(logout())}
                                        disabled={status === 'loading'}
                                >
                                    {t('header.logout')}
                                </Button>
                            </div>
                        </div>
                        :
                        <div style={{display: 'flex'}}>
                            <ModalLogin/>
                            <ModalRegistration/>
                        </div>
                }
            </div>
            <div className={s.burgerButton}
                 onClick={onClickBurgerHandler}
                 style={isOpen ? {backgroundImage: `url(${closeMenu})`} : {backgroundImage: `url(${menu})`}}
            >
            </div>
        </div>
    )
}