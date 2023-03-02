import React, {FC, useEffect} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {deleteItem, fetchItems} from '../../store/thunk/itemThunk';
import {Button, Checkbox, Space, Table, Tag} from 'antd';
import {Item} from '../../models/Item';
import {ColumnsType} from 'antd/es/table';
import {fields} from '../../shared/fields';
import {DeleteTwoTone, LeftCircleOutlined} from '@ant-design/icons';
import {ModalCreateItem} from './Modal/ModalCreateItem';
import {Fields} from '../../type/Fields';
import {Collection} from '../../models/Collection';
import {fetchCollections} from '../../store/thunk/collectionThunk';
import {ModalUpdateItem} from './Modal/ModalUpdateItem';
import {useTranslation} from 'react-i18next';
import {routes} from '../../shared/routes';
import {ReactMarkdown} from 'react-markdown/lib/react-markdown';


export const Items: FC = React.memo(() => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const {id, cId} = useParams<{ id: string, cId: string }>()
    const i = useAppSelector<Item[]>(state => state.item.items)
    const collections = useAppSelector<Collection[]>(state => state.collection.collections)
    const fieldsInCollection = collections.filter(c => c._id === cId).map(c => c.fields)[0]

    const user = useAppSelector(state => state.auth.user)
    const disable = user._id !== id && !user.isAdmin

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
            title: `${t('item.name')}`,
            dataIndex: 'title',
            sorter: (a, b) => {
                const nameA = a.title.toLowerCase()
                const nameB = b.title.toLowerCase()
                return (nameA < nameB ? -1 : nameA > nameB ? 1 : 0)
            },
            render: (text, item) => (
                <NavLink to={`${routes.COLLECTIONS}/${id}${routes.ITEMS}/${cId}${routes.ITEM}/${item._id}`}>
                    {text.slice(0, 20)}
                </NavLink>)
        },
        {
            title: `${t('item.action')}`,
            key: 'action',
            render: (_, item) => (
                <Space style={{minWidth: 100}}>
                    <ModalUpdateItem fieldsOptional={optionFields} item={item}/>
                    <Button disabled={disable} onClick={() => onClickDeleteItem(item._id)}><DeleteTwoTone/></Button>
                </Space>
            ),
        },
        {
            title: `${t('item.tags')}`,
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
    const optionalColumns: ColumnsType<Item> = optionFields.map((f) => {
        return (
            {
                title: f.title,
                key: f.key,
                dataIndex: f.description,
                filters: f.key === '10' ? [{text: 'True', value: true}, {text: 'False', value: false}] :
                    f.key === '11' ? [{text: 'True', value: true}, {text: 'False', value: false}] :
                        f.key === '12' ? [{text: 'True', value: true}, {text: 'False', value: false}] : undefined,
                sorter: f.key === '7' ? (a, b) => a.number1 - b.number1 :
                    f.key === '8' ? (a, b) => a.number2 - b.number2 :
                        f.key === '9' ? (a, b) => a.number3 - b.number3 : undefined
                ,
                onFilter: f.key === '10' ? (value, item) => item.boolean1 === value :
                    f.key === '11' ? (value, item) => item.boolean2 === value :
                        f.key === '12' ? (value, item) => item.boolean3 === value : undefined

                ,
                render: (el) => {
                    return (<>
                        {
                            typeof el === 'boolean'
                                ? <Checkbox checked={el}/>
                                : el !== null
                                    ? <ReactMarkdown children={`${el}`}/>
                                    : ''
                        }
                    </>)
                }
            }
        )
    })
    const columns: ColumnsType<Item> = [...defaultColumns, ...optionalColumns]

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
                <NavLink to={`${routes.COLLECTIONS}/${id}`}><Button><LeftCircleOutlined/></Button></NavLink>
                <ModalCreateItem fieldsOptional={optionFields}/>
            </div>
            <Table columns={columns} dataSource={items} scroll={{x: true}}/>
        </div>
    )
})