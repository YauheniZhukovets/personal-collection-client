import React, { memo, useState } from 'react'

import { GithubOutlined, GoogleOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'hooks'
import { getGitHubUrl, getGoogleOAuthUrl } from 'shared'
import { login } from 'store/thunk'
import { AuthValueType, StatusType } from 'type'

export const ModalLogin: React.FC = memo(() => {
  const dispatch = useAppDispatch()
  const status = useAppSelector<StatusType>(state => state.app.status)
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const location = useLocation()
  let from = ((location.state as any)?.from?.pathname as string) || '/'

  const showModal = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const onSubmitForm = async (values: AuthValueType) => {
    await dispatch(login(values.email, values.password))
    if (status === 'succeeded') {
      handleCancel()
    }
  }

  return (
    <div style={{ marginRight: 5 }}>
      <Button onClick={showModal}>{t('header.signIn')}</Button>
      <Modal open={open} title={t('signIn.signIn')} onCancel={handleCancel} footer={[]}>
        <Form name="login" onFinish={onSubmitForm} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item
            label={t('signIn.email')}
            name="email"
            rules={[{ required: true, min: 3, message: 'Please input your Email!' }]}
          >
            <Input placeholder="Email..." />
          </Form.Item>

          <Form.Item
            label={t('signIn.password')}
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <Form.Item>
              <Button htmlType="submit" type="primary" disabled={status === 'loading'}>
                {t('signIn.signIn')}
              </Button>
            </Form.Item>

            <span>{t('signIn.or')}</span>
            <Space direction="vertical">
              <Button icon={<GoogleOutlined />}>
                <a href={getGoogleOAuthUrl(from)}>{` ${t('signIn.signInGoogle')}`}</a>
              </Button>
              <Button icon={<GithubOutlined />}>
                <a href={getGitHubUrl(from)}>{` ${t('signIn.signInGitHub')}`}</a>
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  )
})
