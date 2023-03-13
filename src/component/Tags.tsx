import React, { memo, FC } from 'react'

import { Divider, Empty } from 'antd'
import CheckableTag from 'antd/es/tag/CheckableTag'
import { useTranslation } from 'react-i18next'

import { useAppDispatch, useAppSelector } from 'hooks'
import { Tag } from 'models'
import { setSearchItems, setSelectedTags } from 'store/action'

export const Tags: FC = memo(() => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const tags = useAppSelector<Tag[]>(state => state.app.tags)
  const selectedTags = useAppSelector<string[]>(state => state.app.selectedTags)

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag)

    dispatch(setSelectedTags(nextSelectedTags))
  }

  return (
    <>
      <Divider plain>
        <span>{t('main.tags')}</span>
      </Divider>
      {tags.length ? (
        <div style={{ background: '#b9b9b9', borderRadius: 10, padding: 10 }}>
          {tags.map(tag => (
            <CheckableTag
              key={tag._id}
              checked={selectedTags.includes(tag.title)}
              onClick={() => dispatch(setSearchItems([]))}
              onChange={checked => handleChange(tag.title, checked)}
            >
              {tag.title}
            </CheckableTag>
          ))}
        </div>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  )
})
