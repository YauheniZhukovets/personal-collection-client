import React, {FC, useEffect} from 'react';
import CheckableTag from 'antd/es/tag/CheckableTag';
import {Divider, Empty} from 'antd';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {setSelectedTags} from '../store/action/appAction';
import {useTranslation} from 'react-i18next';
import {Tag} from '../models/Tag';
import {fetchTags} from '../store/thunk/commonThunk';
import {Item} from '../models/Item';

export const Tags: FC = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const tags = useAppSelector<Tag[]>(state => state.app.tags)
    const items = useAppSelector<Item[]>(state => state.item.items)
    const selectedTags = useAppSelector<string[]>(state => state.app.selectedTags)

    useEffect(() => {
        dispatch(fetchTags())
    }, [tags, items])

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag)
        dispatch(setSelectedTags(nextSelectedTags))
    }

    return (
        <>
            <Divider plain>{t('main.tags')}</Divider>
            {tags.length ?
                <div style={{background: '#b9b9b9', borderRadius: 10, padding: 10}}>
                    {tags.map((tag) => (
                        <CheckableTag
                            key={tag._id}
                            checked={selectedTags.includes(tag.title)}
                            onChange={(checked) => handleChange(tag.title, checked)}
                        >
                            {tag.title}
                        </CheckableTag>
                    ))}
                </div>
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            }
        </>
    )
}