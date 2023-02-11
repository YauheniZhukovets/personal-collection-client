import React, {useEffect, useState} from 'react';
import {Button, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {fetchUsers} from '../store/thunk/userThunk';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {User} from '../models/User';

/*export interface User {
    _id: string
    name: string
    email: string
    collectionsCount: number
    isAdmin: boolean
    isBlocked: boolean
    createdAt: Date
    updatedAt: Date

}*/
/*interface DataType {
    key: React.Key;
    name: string;
    email: string;
    isAdmin: boolean
    isBlocked: boolean
    collectionsCount: number
}*/

const columns: ColumnsType<User> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Admin',
        dataIndex: 'isAdmin',
    },
    {
        title: 'Blocked',
        dataIndex: 'isBlocked',
    },
    {
        title: 'Collections',
        dataIndex: 'collectionsCount',
    },
]

export const AdminPanel: React.FC = () => {
    const dispatch = useAppDispatch()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const users = useAppSelector<User[]>(state => state.user.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])


    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <div style={{marginBottom: 16}}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Reload
                </Button>
                <span style={{marginLeft: 8}}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={users}/>
        </div>
    );
}