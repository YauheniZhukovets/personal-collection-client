import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {fetchCollections} from '../store/thunk/collectionThunk';
import {useParams} from 'react-router-dom';
import {Collection} from '../models/Collection';

export const Collections: FC = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams<{ id: string }>()
    const collections = useAppSelector<Collection[]>(state => state.collection.collections)


    useEffect(() => {
        if (id) {
            dispatch(fetchCollections(id))
        }
    }, [])

    return (
        <div>
            Collections
            {collections && collections.map((c) => {
                return (
                    <div key={c._id}>
                        <div>Картинка: {c.image}</div>
                        <div>Имя коллекции: {c.name}</div>
                        <div>тема: {c.theme}</div>
                        <div>описание: {c.description}</div>
                        <div>число Айтемов: {c.itemsCount}</div>
                        <div>Юсер: {c.user.name}</div>
                    </div>
                )
            })}
        </div>
    )
}