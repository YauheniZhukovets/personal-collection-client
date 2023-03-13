import React, { memo, FC, useEffect, useState } from 'react'

import { Button, List, message, Space, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'usehooks-ts'

import { Comment } from './Comment'

import { useAppDispatch, useAppSelector } from 'hooks'
import { IComment } from 'models'
import { createComment, fetchComments } from 'store/thunk'
import { StatusType } from 'type'

const { Title } = Typography

export const CommentsList: FC = memo(() => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [text, setText] = useState<string>('')
  const comments = useAppSelector<IComment[]>(state => state.comments.comments)
  const status = useAppSelector<StatusType>(state => state.app.status)
  const itemId = useAppSelector<string>(state => state.item.item._id)
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const debouncedComments = useDebounce<IComment[]>(comments, 5000)

  useEffect(() => {
    if (itemId) {
      dispatch(fetchComments(itemId))
    }
  }, [itemId, debouncedComments])

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }
  const onKeyPressText = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit()
    }
  }
  const handleSubmit = () => {
    if (isAuth) {
      if (!text.trim().length) {
        message.error('Comment text is required')
      } else {
        dispatch(createComment(itemId, text))
        setText('')
      }
    } else {
      message.error('Please register or login')
    }
  }

  return (
    <Space direction="vertical" size="small" style={{ display: 'flex' }}>
      <Title style={{ textAlign: 'center' }} level={4}>
        {t('comment.title')}
      </Title>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          alignItems: 'center',
          margin: '0 auto',
          gap: 10,
        }}
      >
        <List
          itemLayout="vertical"
          style={{ width: '100%' }}
          dataSource={comments ? comments : []}
          renderItem={item => <Comment key={item._id} c={item} />}
        />
        <TextArea
          value={text}
          showCount
          maxLength={600}
          style={{ height: 120, resize: 'none', width: '100%' }}
          onChange={onChangeTextArea}
          onKeyPress={onKeyPressText}
          placeholder={`${t('comment.placeholder')}`}
        />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button onClick={handleSubmit} disabled={status === 'loading' || !isAuth}>
            {t('comment.button')}
          </Button>
        </div>
      </div>
    </Space>
  )
})
