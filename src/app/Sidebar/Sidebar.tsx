import React, {FC} from 'react';
import {Menu} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {useAppSelector} from '../../hooks/hooks';
import {User} from '../../models/User';
import {admin, authorized, guest} from './linksForSidebar';

type SidebarPropsType = {
    collapsed: boolean
}

export const Sidebar: FC<SidebarPropsType> = ({collapsed}) => {
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const user = useAppSelector<User>(state => state.auth.user)

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