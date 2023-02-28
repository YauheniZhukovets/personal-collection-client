import React, {useState} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {AuthValueType, StatusType} from '../../type/Common';
import {registration} from '../../store/thunk/authThunk';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {useTranslation} from 'react-i18next';
import {GoogleOutlined} from '@ant-design/icons';

export const ModalRegistration: React.FC = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useAppDispatch()
    const status = useAppSelector<StatusType>(state => state.app.status)
    const {t} = useTranslation()


    const showModal = () => {
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const onSubmitForm = async (values: AuthValueType) => {
        await dispatch(registration(values.email, values.name, values.password))
        if (status === 'succeeded') {
            handleCancel()
        }
    }

    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google`, '_self')
    }

    return (
        <div>
            <Button onClick={showModal}>
                {t('header.signUp')}
            </Button>
            <Modal
                open={open}
                title={t('signUp.signUp')}
                onCancel={handleCancel}
                footer={[]}
            >
                <Form
                    name="registration"
                    onFinish={onSubmitForm}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18}}
                >
                    <Form.Item label={t('signUp.email')}
                               name="email"
                               rules={[{required: true, min: 3, message: 'Please input your Email!'}]}
                    >
                        <Input placeholder="Email..."/>
                    </Form.Item>

                    <Form.Item label={t('signUp.password')}
                               name="password"
                               rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item label={t('signUp.username')}
                               name="name"
                    >
                        <Input/>
                    </Form.Item>

                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                        <Form.Item>
                            <Button htmlType="submit"
                                    type="primary"
                                    disabled={status === 'loading'}
                            >
                                {t('signUp.signUp')}
                            </Button>
                        </Form.Item>

                        <span>{t('signIn.or')}</span>
                        <Button onClick={googleAuth} icon={<GoogleOutlined/>}>
                            <span>{t('signIn.signInGoogle')}</span>
                        </Button>
                    </div>

                </Form>
            </Modal>
        </div>
    );
}