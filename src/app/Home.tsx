import React, {FC, useEffect} from 'react';
import {fetchCollectionsAndItems} from '../store/thunk/commonThunk';
import {useAppDispatch} from '../hooks/hooks';
import {MainPage} from './MainPage';
import {Tags} from './Tags';
import {Space} from 'antd';

export const Home: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCollectionsAndItems())
    }, [])

    return (
        <Space direction="vertical"
               size="middle"
               style={{display: 'flex', margin: '0 auto', minWidth: '350px', maxWidth: '60%'}}
        >
            <Tags/>
            <MainPage/>
        </Space>
    )
}