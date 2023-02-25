import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchCollections} from '../../store/thunk/collectionThunk';
import {NavLink, useParams} from 'react-router-dom';
import {Collection} from '../../models/Collection';
import {Button, List} from 'antd';
import {ModalCreateCollection} from './Modal/ModalCreateCollection';
import {CollectionsItem} from './CollectionsItem';
import {LeftCircleOutlined} from '@ant-design/icons';
import {routes} from '../../shared/routes';

export const CollectionsList: FC = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const collections = useAppSelector<Collection[]>(state => state.collection.collections)

    const user = useAppSelector(state => state.auth.user)
    const show = user._id !== id && !user.isAdmin

    useEffect(() => {
        if (id) {
            dispatch(fetchCollections(id))
        }
    }, [id])

    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
                <NavLink to={routes.HOME}><Button><LeftCircleOutlined/></Button></NavLink>
                {!show && <ModalCreateCollection/>}
            </div>

            <List itemLayout="vertical"
                  size="default"
                  pagination={{
                      pageSize: 5,
                  }}
                  dataSource={collections ? collections : []}
                  renderItem={(item) => (
                      <CollectionsItem key={item._id} item={item}/>
                  )}
            />
        </>
    )
}