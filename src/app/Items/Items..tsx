import React, {FC, useEffect} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {deleteItem, fetchItems} from '../../store/thunk/itemThunk';
import {Button, Space, Table, Tag} from 'antd';
import {Item} from '../../models/Item';
import {ColumnsType} from 'antd/es/table';
import {fields} from '../../shared/fields';
import {DeleteTwoTone} from '@ant-design/icons';
import {ModalCreateItem} from './Modal/ModalCreateItem';
import {Fields} from '../../type/Fields';
import {Collection} from '../../models/Collection';
import {fetchCollections} from '../../store/thunk/collectionThunk';
import {ModalUpdateItem} from './Modal/ModalUpdateItem';


export const Items: FC = () => {
    const dispatch = useAppDispatch()
    const {id, cId} = useParams<{ id: string, cId: string }>()
    const i = useAppSelector<Item[]>(state => state.item.items)
    const collections = useAppSelector<Collection[]>(state => state.collection.collections)
    const fieldsInCollection = collections.filter(c => c._id === cId).map(c => c.fields)[0]

    const items = i.map((el, i) => ({...el, key: i}))

    useEffect(() => {
        if (cId && id) {
            dispatch(fetchCollections(id))
            dispatch(fetchItems(cId))
        }
        return
    }, [])

    const onClickDeleteItem = (iId: string) => {
        dispatch(deleteItem(id!, cId!, iId))
    }

    const optionFields: Fields[] = fields.filter(el => fieldsInCollection?.includes(el.key))
    const defaultColumns: ColumnsType<Item> = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: (text) => <NavLink to={''}>{text}</NavLink>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, item) => (
                <Space style={{minWidth: 100}}>
                    <ModalUpdateItem fieldsOptional={optionFields} item={item}/>
                    <Button onClick={() => onClickDeleteItem(item._id)}><DeleteTwoTone/></Button>
                </Space>
            ),
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            render: (_, {tags}) => (
                <>
                    {tags.map((tag) => (
                        <Tag key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    ))}
                </>
            ),
        }
    ]
    const optionalColumns: ColumnsType<Item> = optionFields.map(el => {
        return (
            {
                title: el.title,
                key: el.key,
                dataIndex: el.description,
                render: (el) => <div>{el}</div>,
            }
        )
    })
    const columns: ColumnsType<Item> = [...defaultColumns, ...optionalColumns]

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <ModalCreateItem fieldsOptional={optionFields}/>
            <Table columns={columns} dataSource={items} scroll={{x: true}}/>
        </div>
    )
}