import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {fetchCollections} from '../../store/thunk/collectionThunk';
import {useParams} from 'react-router-dom';
import {Collection} from '../../models/Collection';
import {List} from 'antd';
import {ModalCreateCollection} from './Modal/ModalCreateCollection';
import {CollectionsItem} from './CollectionsItem';

export const CollectionsList: FC = () => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const collections = useAppSelector<Collection[]>(state => state.collection.collections)

    useEffect(() => {
        if (id) {
            dispatch(fetchCollections(id))
        }
    }, [id])

    return (
        <>
            <ModalCreateCollection/>
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