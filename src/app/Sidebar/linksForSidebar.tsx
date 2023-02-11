import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons';
import {NavLink} from 'react-router-dom';
import React from 'react';

export const admin = [
        {
            key: '1',
            icon: <UserOutlined/>,
            label: (<NavLink to={'/'}>Home</NavLink>),
        },
        {
            key: '2',
            icon: <VideoCameraOutlined/>,
            label: (<NavLink to={'/collection'}>Collection</NavLink>),
        },
        {
            key: '3',
            icon: <UploadOutlined/>,
            label: (<NavLink to={'/admin'}>Admin Panel</NavLink>),
        },
    ]

export const authorized = [
    {
        key: '1',
        icon: <UserOutlined/>,
        label: (<NavLink to={'/'}>Home</NavLink>),
    },
    {
        key: '2',
        icon: <VideoCameraOutlined/>,
        label: (<NavLink to={'/collection'}>Collection</NavLink>),
    },
]

export const guest = [
    {
        key: '1',
        icon: <UserOutlined/>,
        label: (<NavLink to={'/'}>Home</NavLink>),
    }
]