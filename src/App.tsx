import React, {useEffect, useState} from 'react';
import './index.css';
import "easymde/dist/easymde.min.css";
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {checkAuth, logout} from './store/thunk/authThunk';
import {AppRoutes} from './component/AppRoutes';
import {ModalLogin} from './app/ModalLogin';
import {ModalRegistration} from './app/ModalRegistration';
import {Button, ConfigProvider, Layout, Switch, theme} from 'antd';
import {StatusType} from './type/Common';
import {useTranslation} from 'react-i18next';
import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import {Backdrop, CircularProgress} from '@mui/material';
import {Sidebar} from './component/Sidebar';

const {Header, Content, Footer} = Layout

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialize = useAppSelector<boolean>(state => state.auth.isInitialize)
    const email = useAppSelector<string>(state => state.auth.user.email)
    const status = useAppSelector<StatusType>(state => state.app.status)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
    const [language, setLanguage] = useState<string>('en')
    const [collapsed, setCollapsed] = useState(true)
    const {i18n, t} = useTranslation()
    const {defaultAlgorithm, darkAlgorithm} = theme

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        const lang = localStorage.getItem('lang')
        dispatch(checkAuth())
        if (theme) {
            setIsDarkMode(JSON.parse(theme))
        }
        if (lang) {
            setLanguage(lang)
            i18n.changeLanguage(lang).then(r => r)
        } else {
            i18n.changeLanguage(language).then(r => r)
        }

    }, [])


    const onClickLogout = () => {
        dispatch(logout())
    }
    const changeTheme = () => {
        setIsDarkMode((previousValue) => !previousValue)
        localStorage.setItem('theme', JSON.stringify(!isDarkMode))
    }

    const changeLanguage = () => {
        if (language === 'en') {
            setLanguage('ru')
            i18n.changeLanguage('ru').then(r => r)
            localStorage.setItem('lang', 'ru')
        } else {
            setLanguage('en')
            i18n.changeLanguage('en').then(r => r)
            localStorage.setItem('lang', 'en')
        }

    }

    if (!isInitialize) {
        return (
            <Backdrop open={status === 'loading'} sx={{color: '#fff', zIndex: 10}}>
                <CircularProgress/>
            </Backdrop>
        )
    }
    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}>
            <Backdrop open={status === 'loading'} sx={{color: '#fff', zIndex: 10}}>
                <CircularProgress/>
            </Backdrop>
            <Layout style={{minHeight: '100vh'}}>
                <Sidebar collapsed={collapsed}/>
                <Layout className="site-layout">
                    <Header style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%'
                    }}>
                        <div style={{color: 'white'}}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </div>
                        <div style={{display: 'flex', gap: 5}}>
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
                                email ?
                                    <div style={{display: 'flex'}}>
                                        <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                                            <div style={{color: 'lightgrey'}}>{email}</div>
                                            <Button onClick={onClickLogout}
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
                    </Header>
                    <Content className="site-layout" style={{padding: '0 50px', margin: '16px 0'}}>
                        <AppRoutes/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Personal Collection ©2023 Created by Yauheni Zhukovets</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}




