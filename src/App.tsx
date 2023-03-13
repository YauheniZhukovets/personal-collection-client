import React, {useEffect, useState} from 'react';
import './index.css';
import 'easymde/dist/easymde.min.css';

import {AutoComplete, ConfigProvider, Input, Layout, message, theme} from 'antd';

import {useTranslation} from 'react-i18next';
import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import {Backdrop, CircularProgress} from '@mui/material';

import {useNavigate} from 'react-router-dom';

import {useDebounce} from 'usehooks-ts';
import {NullAnd, StatusType} from 'type';
import {AppRoutes, BurgerNav, Nav, Sidebar} from 'component';
import {checkAuth, fetchSearchItems, fetchTags} from 'store/thunk';
import {useAppDispatch, useAppSelector} from 'hooks';
import {Item} from 'models';
import {routes} from 'shared';
import {setError, setSearchItems, setSearchText, setSelectedTags} from 'store/action';


const {Header, Content, Footer} = Layout

export const App = () => {
    const {defaultAlgorithm, darkAlgorithm} = theme
    const {i18n, t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isInitialize = useAppSelector<boolean>(state => state.auth.isInitialize)
    const status = useAppSelector<StatusType>(state => state.app.status)
    const search = useAppSelector<string>(state => state.app.search)
    const searchItems = useAppSelector<Item[]>(state => state.item.searchItems)
    const selectedTags = useAppSelector<string[]>(state => state.app.selectedTags)
    const error = useAppSelector<NullAnd<string>>(state => state.app.error)
    const items = useAppSelector<Item[]>(state => state.item.items)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
    const [language, setLanguage] = useState<string>('en')
    const [collapsed, setCollapsed] = useState(true)
    const debouncedSearch = useDebounce(search, 500)
    const debouncedTags = useDebounce(items, 5000)


    useEffect(() => {
        if (error) {
            message.error(error)
        }
        return () => {
            setTimeout(() => {
                dispatch(setError(null))
            }, 2000)
        }
    }, [error])

    useEffect(() => {
        dispatch(fetchTags())
    }, [debouncedTags])

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        const lang = localStorage.getItem('lang')
        dispatch(checkAuth())
        if (theme) {
            setIsDarkMode(JSON.parse(theme))
        }
        if (lang) {
            setLanguage(lang)
            i18n.changeLanguage(lang)
        } else {
            i18n.changeLanguage(language)
        }
    }, [])

    useEffect(() => {
        if (search) {
            dispatch(fetchSearchItems(search))
        }
        if (!!selectedTags.length) {
            dispatch(fetchSearchItems(undefined))
        }
    }, [debouncedSearch, selectedTags])

    const changeTheme = () => {
        setIsDarkMode((previousValue) => !previousValue)
        localStorage.setItem('theme', JSON.stringify(!isDarkMode))
    }

    const changeLanguage = () => {
        if (language === 'en') {
            setLanguage('ru')
            i18n.changeLanguage('ru')
            localStorage.setItem('lang', 'ru')
        } else {
            setLanguage('en')
            i18n.changeLanguage('en')
            localStorage.setItem('lang', 'en')
        }
    }

    const onSearchInput = (value: string) => {
        dispatch(setSearchText(value))
    }

    const onSelect = (value: string) => {
        const i = searchItems.find(el => el.title === value)
        if (i) {
            navigate(`${routes.COLLECTIONS}/${i.user}${routes.ITEMS}/${i.collectionName}${routes.ITEM}/${i._id}`)
            dispatch(setSelectedTags([]))
            dispatch(setSearchItems([]))
        }
    }

    if (!isInitialize) {
        return (
            <Backdrop open={status === 'loading'} sx={{color: '#fff', zIndex: 11}}>
                <CircularProgress/>
            </Backdrop>
        )
    }
    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
            }}>
            <Backdrop open={status === 'loading'} sx={{zIndex: 10}}>
                <CircularProgress/>
            </Backdrop>
            <Layout style={{minHeight: '100vh'}}>
                <Sidebar collapsed={collapsed}/>
                <Layout className="site-layout">
                    <Header style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%'
                    }}>
                        <div style={{display: 'flex', color: 'white', gap: 10, alignItems: 'center'}}>
                            <div>
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => setCollapsed(!collapsed),
                                })}
                            </div>
                            <AutoComplete
                                open={!!selectedTags.length ? true : undefined}
                                style={{minWidth: 150}}
                                allowClear
                                options={searchItems.map(i => i ? {value: i.title} : {})}
                                onSelect={onSelect}
                                onSearch={onSearchInput}
                            >
                                <Input size="middle" placeholder={`${t('header.search')}`}/>
                            </AutoComplete>
                        </div>
                        <Nav isDarkMode={isDarkMode}
                             language={language}
                             changeLanguage={changeLanguage}
                             changeTheme={changeTheme}
                        />
                        <BurgerNav isDarkMode={isDarkMode}
                                   language={language}
                                   changeLanguage={changeLanguage}
                                   changeTheme={changeTheme}
                        />
                    </Header>
                    <Content className="site-layout" style={{padding: '0 50px', margin: '16px 0'}}>
                        <AppRoutes/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Personal Collection ©2023 Created by Yauheni Zhukovets
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}