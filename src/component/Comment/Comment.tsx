import React, { memo, FC } from 'react'

import { DeleteTwoTone, FieldTimeOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, List } from 'antd'

import { IconText, ModalUpdateComment } from 'component'
import { useAppDispatch, useAppSelector } from 'hooks'
import { IComment, User } from 'models'
import { deleteComment } from 'store/thunk'

type CommentType = {
  c: IComment
}

export const Comment: FC<CommentType> = memo(({ c }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector<User>(state => state.auth.user)

  const isValidUser = user._id === c.user._id || user.isAdmin

  const onClickDeleteComment = (commentId: string) => {
    dispatch(deleteComment(c.item, commentId))
  }

  return (
    <List.Item
      key={c._id}
      actions={[
        <IconText key={1} icon={UserOutlined} text={`${c.user.name}`} />,
        <IconText key={2} icon={FieldTimeOutlined} text={`${c.updated.slice(0, 10)}`} />,
        isValidUser && <ModalUpdateComment oldComment={c} />,
        isValidUser && (
          <Button onClick={() => onClickDeleteComment(c._id)}>
            <DeleteTwoTone />
          </Button>
        ),
      ]}
    >
      <List.Item.Meta avatar={<Avatar />} title={c.user.name} description={c.user.email} />
      {c.text}
    </List.Item>
  )
})
