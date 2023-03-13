import React, { memo, FC, useEffect } from 'react'

import { LeftCircleOutlined } from '@ant-design/icons'
import { Button, List } from 'antd'
import { NavLink, useParams } from 'react-router-dom'

import { CollectionsItem, ModalCreateCollection } from 'component'
import { useAppDispatch, useAppSelector } from 'hooks'
import { Collection } from 'models'
import { routes } from 'shared'
import { fetchCollections } from 'store/thunk'

export const CollectionsList: FC = memo(() => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const collections = useAppSelector<Collection[]>(state => state.collection.collections)

  const user = useAppSelector(state => state.auth.user)
  const show = user._id !== id && !user.isAdmin

  useEffect(() => {
    if (id) {
      dispatch(fetchCollections(id))
    }
  }, [id])

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        <NavLink to={routes.HOME}>
          <Button>
            <LeftCircleOutlined />
          </Button>
        </NavLink>
        {!show && <ModalCreateCollection />}
      </div>

      <List
        itemLayout="vertical"
        size="default"
        pagination={{
          pageSize: 5,
        }}
        dataSource={collections ? collections : []}
        renderItem={item => <CollectionsItem key={item._id} item={item} />}
      />
    </>
  )
})
