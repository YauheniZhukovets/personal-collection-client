import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {useTranslation} from 'react-i18next';
import {NavLink, useParams} from 'react-router-dom';
import {Item} from '../../models/Item';
import {fetchItem} from '../../store/thunk/itemThunk';
import {Button, Card, Checkbox, Descriptions, Tag} from 'antd';
import {routes} from '../../shared/routes';
import {LeftCircleOutlined} from '@ant-design/icons';
import {ReactMarkdown} from 'react-markdown/lib/react-markdown';
import {CommentsPage} from './Comment/CommentsPage';
import {Like} from './Like';

export const ItemPage: FC = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const {id, cId, iId} = useParams<{ id: string, cId: string, iId: string }>()
    const item = useAppSelector<Item>(state => state.item.item)

    useEffect(() => {
        if (cId && iId) {
            dispatch(fetchItem(cId, iId))
        }
        return
    }, [id, cId, iId])

    return (
        <div>
            <NavLink to={`${routes.COLLECTIONS}/${id}${routes.ITEMS}/${cId}`}>
                <Button><LeftCircleOutlined/></Button>
            </NavLink>
            <Card style={{marginTop: 10, marginBottom: 10}} title={item.title}>
                {item.text1 &&
                    <Card type="inner" title={t('item.text1')}>
                        <ReactMarkdown children={item.text1}/>
                    </Card>}
                {item.text2 &&
                    <Card style={{marginTop: 20}} type="inner" title={t('item.text2')}>
                        <ReactMarkdown children={item.text2}/>
                    </Card>}
                {item.text3 &&
                    <Card style={{marginTop: 20}} type="inner" title={t('item.text3')}>
                        <ReactMarkdown children={item.text3}/>
                    </Card>}
                <Descriptions style={{marginTop: 20}} layout="vertical">
                    {item.string1 && <Descriptions.Item label={t('item.string1')}>{item.string1}</Descriptions.Item>}
                    {item.string2 && <Descriptions.Item label={t('item.string2')}>{item.string2}</Descriptions.Item>}
                    {item.string3 && <Descriptions.Item label={t('item.string3')}>{item.string3}</Descriptions.Item>}
                    {item.date1 && <Descriptions.Item label={t('item.date1')}>{item.date1}</Descriptions.Item>}
                    {item.date2 && <Descriptions.Item label={t('item.date2')}>{item.date2}</Descriptions.Item>}
                    {item.date3 && <Descriptions.Item label={t('item.date3')}>{item.date3}</Descriptions.Item>}
                    {item.boolean1 &&
                        <Descriptions.Item label={t('item.boolean1')}>
                            <Checkbox checked={item.boolean1}/>
                        </Descriptions.Item>
                    }
                    {item.boolean2 &&
                        <Descriptions.Item label={t('item.boolean2')}>
                            <Checkbox checked={item.boolean2}/>
                        </Descriptions.Item>
                    }
                    {item.boolean3 &&
                        <Descriptions.Item label={t('item.boolean3')}>
                            <Checkbox checked={item.boolean3}/>
                        </Descriptions.Item>
                    }
                    {item.number1 && <Descriptions.Item label={t('item.number1')}>{item.number1}</Descriptions.Item>}
                    {item.number2 && <Descriptions.Item label={t('item.number2')}>{item.number2}</Descriptions.Item>}
                    {item.number3 && <Descriptions.Item label={t('item.number3')}>{item.number3}</Descriptions.Item>}
                    {item.tags &&
                        <Descriptions.Item label={t('item.tags')}>
                            {item.tags.map((tag) => (
                                <Tag key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            ))}
                        </Descriptions.Item>
                    }
                </Descriptions>
            </Card>
            {
                item.likes && <Like item={item}/>
            }
            <CommentsPage/>
        </div>
    );
}
