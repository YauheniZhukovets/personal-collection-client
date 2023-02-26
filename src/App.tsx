import React, {useEffect, useState} from 'react';
import './index.css';
import 'easymde/dist/easymde.min.css';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {checkAuth, logout} from './store/thunk/authThunk';
import {AppRoutes} from './component/AppRoutes';
import {ModalLogin} from './app/Auth/ModalLogin';
import {ModalRegistration} from './app/Auth/ModalRegistration';
import {AutoComplete, Button, ConfigProvider, Input, Layout, Switch, theme} from 'antd';
import {StatusType} from './type/Common';
import {useTranslation} from 'react-i18next';
import {MenuFoldOutlined, MenuUnfoldOutlined,} from '@ant-design/icons';
import {Backdrop, CircularProgress} from '@mui/material';
import {Sidebar} from './component/Sidebar';
import {useNavigate} from 'react-router-dom';
import {routes} from './shared/routes';
import {setSearchText, setSelectedTags} from './store/action/appAction';
import {useDebounce} from 'usehooks-ts';
import {fetchSearchItems, fetchTags} from './store/thunk/commonThunk';
import {Item} from './models/Item';


const {Header, Content, Footer} = Layout

export const App = () => {
    const {defaultAlgorithm, darkAlgorithm} = theme
    const {i18n, t} = useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const isInitialize = useAppSelector<boolean>(state => state.auth.isInitialize)
    const email = useAppSelector<string>(state => state.auth.user.email)
    const status = useAppSelector<StatusType>(state => state.app.status)
    const search = useAppSelector<string>(state => state.app.search)
    const searchItems = useAppSelector<Item[]>(state => state.item.searchItems)
    const selectedTags = useAppSelector<string[]>(state => state.app.selectedTags)
    const items = useAppSelector<Item[]>(state => state.item.items)
    const tags = useAppSelector<Tags[]>(state => state.app.tags)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
    const [language, setLanguage] = useState<string>('en')
    const [collapsed, setCollapsed] = useState(true)
    const debouncedSearch = useDebounce(search, 500)

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

    useEffect(() => {
        dispatch(fetchTags())
    }, [items, tags])

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
                                allowClear
                                options={searchItems.map(i => i ? {value: i.title} : {})}
                                onSelect={onSelect}
                                onSearch={onSearchInput}
                            >
                                <Input size="middle" placeholder={`${t('header.search')}`}/>
                            </AutoComplete>
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
                    <Footer style={{textAlign: 'center'}}>
                        Personal Collection ©2023 Created by Yauheni Zhukovets
                    </Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}