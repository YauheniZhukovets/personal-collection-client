import React, {useState} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {AuthValueType, StatusType} from '../type/Common';
import {registration} from '../store/thunk/authThunk';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {useTranslation} from 'react-i18next';

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
                    name="normal_login"
                    className="login-form"
                    onFinish={onSubmitForm}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 18}}
                >
                    <Form.Item
                        label={t('signUp.email')}
                        name="email"
                        rules={[{required: true, min: 3, message: 'Please input your Email!'}]}
                    >
                        <Input placeholder="Email..."/>
                    </Form.Item>

                    <Form.Item
                        label={t('signUp.password')}
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        label={t('signUp.username')}
                        name="name"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit"
                                type="primary"
                                className="login-form-button"
                                disabled={status === 'loading'}
                        >
                            {t('signUp.signUp')}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}