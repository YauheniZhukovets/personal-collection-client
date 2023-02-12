import React, {useEffect, useState} from 'react';
import {Button, Space, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {banedUser, fetchUsers, removeUser, unBanedUser} from '../store/thunk/userThunk';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {DomainUser, User} from '../models/User';
import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

export const AdminPanel: React.FC = () => {
    const {t} = useTranslation()
    const columns: ColumnsType<User> = [
        {
            title: `${t('admin.email')}`,
            dataIndex: 'email',
            render: (_, u) => (
                <Space size="middle">
                    <NavLink to={`/collection/${u._id}`}>{u.email}</NavLink>
                </Space>
            ),
        },
        {
            title: `${t('admin.name')}`,
            dataIndex: 'name',
        },
        {
            title: `${t('admin.admin')}`,
            dataIndex: 'isAdmin',
        },
        {
            title: `${t('admin.block')}`,
            dataIndex: 'isBlocked',
        },
        {
            title: `${t('admin.collections')}`,
            dataIndex: 'collectionsCount',
        },
    ]
    const dispatch = useAppDispatch()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const status = useAppSelector<string>(state => state.app.status)
    const u = useAppSelector<any>(state => state.user.users)


    const users = u.map((el: DomainUser, i: number) => {
        let admin = el.isAdmin
        let baned = el.isBlocked
        return (
            {...el, key: i, isAdmin: String(admin), isBlocked: String(baned)}
        )
    })

    const getUserId = (users: DomainUser[], key: React.Key[]) => {
        return users.filter((u) => key.includes(u.key)).map(el => el._id)
    }

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])


    const onClickBlock = () => {
        const ids = getUserId(users, selectedRowKeys)
        dispatch(banedUser(ids))
    }

    const onClickUnBlock = () => {
        const ids = getUserId(users, selectedRowKeys)
        dispatch(unBanedUser(ids))
    }

    const onClickDelete = () => {
        const ids = getUserId(users, selectedRowKeys)
        dispatch(removeUser(ids))
    }

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <div style={{marginBottom: 16, display: 'flex', gap: 5}}>
                <Button onClick={onClickBlock} disabled={status === 'loading'}>
                    {t('admin.onBlock')}
                </Button>
                <Button onClick={onClickUnBlock} disabled={status === 'loading'}>
                    {t('admin.onUnBlock')}
                </Button>
                <Button type="primary" onClick={onClickDelete} disabled={status === 'loading'}>
                    {t('admin.onDelete')}
                </Button>
                <span style={{marginLeft: 8}}>{hasSelected ? `Selected ${selectedRowKeys.length} user` : ''}</span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={users}/>
        </div>
    )
}