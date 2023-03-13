import React, {FC, useEffect} from 'react';

import {Space} from 'antd';
import {useAppDispatch} from 'hooks';
import {MainPage, Tags} from 'pages';
import {fetchCollectionsAndItems} from 'store/thunk';

export const Home: FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCollectionsAndItems())
    }, [])

    return (
        <Space direction="vertical"
               size="middle"
               style={{display: 'flex', margin: '0 auto', minWidth: '200px', maxWidth: '60%'}}
        >
            <Tags/>
            <MainPage/>
        </Space>
    )
}