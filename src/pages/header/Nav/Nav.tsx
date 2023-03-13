import React, {FC} from 'react';
import {Button, Switch} from 'antd';

import {useTranslation} from 'react-i18next';
import s from './Nav.module.css'
import {useAppDispatch, useAppSelector} from 'hooks';
import {logout} from 'store/thunk';
import {User} from 'models';
import {StatusType} from 'type';
import {ModalLogin, ModalRegistration} from 'pages';


type NavType = {
    language: string
    isDarkMode: boolean
    changeTheme: () => void
    changeLanguage: () => void
}

export const Nav: FC<NavType> = React.memo(({language, isDarkMode, changeLanguage, changeTheme}) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const user = useAppSelector<User>(state => state.auth.user)
    const status = useAppSelector<StatusType>(state => state.app.status)

    return (
        <div className={s.nav}>
            <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
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
    )
})