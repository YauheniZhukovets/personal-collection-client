import React, {FC} from 'react';
import CheckableTag from 'antd/es/tag/CheckableTag';
import {Divider} from 'antd';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {setSelectedTags} from '../store/action/appAction';

export const Tags: FC = () => {
    const dispatch = useAppDispatch()
    const tags = useAppSelector<string[]>(state => state.app.tags)
    const selectedTags = useAppSelector<string[]>(state => state.app.selectedTags)

    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag)
        dispatch(setSelectedTags(nextSelectedTags))
    }

    return (
        <>
            <Divider plain>Tags</Divider>
            <div style={{marginBottom: 10}}>
                {tags.map((tag) => (
                    <CheckableTag
                        key={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={(checked) => handleChange(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))}
            </div>
        </>
    )
}