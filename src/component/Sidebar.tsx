import React, {FC} from 'react';
import {Menu} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {useAppSelector} from '../hooks/hooks';
import {User} from '../models/User';
import {HomeOutlined, ProfileOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {routes} from '../shared/routes';

type SidebarPropsType = {
    collapsed: boolean
}

export const Sidebar: FC<SidebarPropsType> = ({collapsed}) => {
    const {t} = useTranslation()
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const user = useAppSelector<User>(state => state.auth.user)

    const admin = [
        {
            key: '1',
            icon: <HomeOutlined/>,
            label: (<NavLink to={routes.HOME}>{t('sidebar.home')}</NavLink>),
        },
        {
            key: '2',
            icon: <ProfileOutlined/>,
            label: (<NavLink to={`${routes.COLLECTIONS}/${user._id}`}>{t('sidebar.collection')}</NavLink>),
        },
        {
            key: '3',
            icon: <UserOutlined/>,
            label: (<NavLink to={routes.ADMIN}>{t('sidebar.admin')}</NavLink>),
        },
    ]
    const authorized = [
        {
            key: '1',
            icon: <UserOutlined/>,
            label: (<NavLink to={routes.HOME}>{t('sidebar.home')}</NavLink>),
        },
        {
            key: '2',
            icon: <VideoCameraOutlined/>,
            label: (<NavLink to={`${routes.COLLECTIONS}/${user._id}`}>{t('sidebar.collection')}</NavLink>),
        },
    ]
    const guest = [
        {
            key: '1',
            icon: <UserOutlined/>,
            label: (<NavLink to={routes.HOME}>{t('sidebar.home')}</NavLink>),
        }
    ]

    const links = user.isAdmin ? admin : isAuth ? authorized : guest

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <Menu
                theme="dark"
                mode="inline"
                items={links}
            />
        </Sider>
    )
}