import React, { memo, FC, useEffect, useRef, useState } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import type { InputRef } from 'antd'
import { Input, Space, Tag, Tooltip } from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { useTranslation } from 'react-i18next'

type TagsType = {
  form: FormInstance
  name: string
  tags: string[]
  setTags: (tags: string[]) => void
}

export const TagsUI: FC<TagsType> = memo(({ form, name, tags, setTags }) => {
  const { t } = useTranslation()
  const [inputVisible, setInputVisible] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [editInputIndex, setEditInputIndex] = useState<number>(-1)
  const [editInputValue, setEditInputValue] = useState<string>('')
  const inputRef = useRef<InputRef>(null)
  const editInputRef = useRef<InputRef>(null)

  useEffect(() => {
    form.setFieldsValue({ [name]: tags })
  }, [tags])

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter(tag => tag !== removedTag)

    setTags(newTags)
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toUpperCase())
  }

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }
    setInputVisible(false)
    setInputValue('')
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...tags]

    newTags[editInputIndex] = editInputValue
    setTags(newTags)
    setEditInputIndex(-1)
    setInputValue('')
  }

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: 'top',
  }

  const tagPlusStyle: React.CSSProperties = {
    borderStyle: 'dashed',
  }

  return (
    <Space size={[0, 8]} wrap>
      <Space size={[0, 8]} wrap>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                size="small"
                style={tagInputStyle}
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            )
          }
          const isLongTag = tag.length > 20
          const tagElem = (
            <Tag key={tag} closable style={{ userSelect: 'none' }} onClose={() => handleClose(tag)}>
              <span
                onDoubleClick={e => {
                  if (index !== 0) {
                    setEditInputIndex(index)
                    setEditInputValue(tag)
                    e.preventDefault()
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          )

          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
      </Space>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} onClick={showInput}>
          <PlusOutlined /> {t('item.newTag')}
        </Tag>
      )}
    </Space>
  )
})
