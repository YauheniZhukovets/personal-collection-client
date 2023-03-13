import React, { memo, FC } from 'react'

import { DeleteTwoTone, FileOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Image, List } from 'antd'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { NavLink, useParams } from 'react-router-dom'

import s from './Collections.module.css'

import { ErrorImage, IconText, ModalUpdateCollection } from 'component'
import { useAppDispatch, useAppSelector } from 'hooks'
import { Collection } from 'models'
import { routes } from 'shared'
import { deleteCollection } from 'store/thunk'

type CollectionsItemProps = {
  item: Collection
}

export const CollectionsItem: FC<CollectionsItemProps> = memo(({ item }) => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()

  const user = useAppSelector(state => state.auth.user)
  const disable = user._id !== id && !user.isAdmin

  const onClickRemoveCollection = (collectionId: string) => {
    dispatch(deleteCollection(id!, collectionId))
  }

  return (
    <>
      <List.Item
        key={item._id}
        actions={[
          <IconText icon={UserOutlined} text={`${item.user.name}`} key="list-vertical-user" />,
          <IconText
            icon={FileOutlined}
            text={`${item.itemsCount}`}
            key="list-vertical-count-item"
          />,
          <ModalUpdateCollection key={1} oldDateItem={item} />,
          <Button key={2} disabled={disable} onClick={() => onClickRemoveCollection(item._id)}>
            <DeleteTwoTone />
          </Button>,
        ]}
        extra={
          item.image !== null ? (
            <div className={s.imgWrap}>
              <Image src={`${item.image}`} />
            </div>
          ) : (
            <ErrorImage />
          )
        }
      >
        <List.Item.Meta
          title={
            <NavLink to={`${routes.COLLECTIONS}/${id}${routes.ITEMS}/${item._id}`}>
              {item.name}
            </NavLink>
          }
          description={item.theme}
        />
        <ReactMarkdown>{item.description}</ReactMarkdown>
      </List.Item>
    </>
  )
})
