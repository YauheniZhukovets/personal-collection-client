import React, {useCallback, useState} from 'react';
import {Button, Form, Input, message, Modal, Select, UploadProps} from 'antd';
import {useAppDispatch, useAppSelector, useTranslateOptions} from '../../../hooks/hooks';
import {StatusType} from '../../../type/Common';
import {uploadImage} from '../../../store/thunk/uploadThunk';
import {InboxOutlined} from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import {RcFile} from 'antd/es/upload';
import {setImageUrl} from '../../../store/action/collectionAction';
import SimpleMdeReact from 'react-simplemde-editor';
import {CustomMarkdownOptions} from '../../../component/CustomMarkdownOptions';
import {useTranslation} from 'react-i18next';
import {createCollection} from '../../../store/thunk/collectionThunk';
import {RequestCollectionType} from '../../../models/Collection';
import {useParams} from 'react-router-dom';
import {themes} from '../../../shared/themeOptions';

const {Option} = Select

export const ModalCreateCollection: React.FC = () => {
    const {t} = useTranslation()
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const status = useAppSelector<StatusType>(state => state.app.status)
    const [open, setOpen] = useState(false)
    const [fileList, setFileList] = useState<RcFile[]>([])
    const [collectionText, setCollectionText] = useState('')
    const [form] = Form.useForm()
    const theme = useTranslateOptions(themes, 'themes')

    const handleUpload = async (file: RcFile) => {
        await dispatch(uploadImage(file))
        message.success(`${file.name} success upload`)
    }

    const propsForUploadImage: UploadProps = {
        onRemove: () => {
            setFileList([])
            dispatch(setImageUrl(null))
        },
        beforeUpload: (file) => {
            const isPic = file.type === 'image/png' || file.type === 'image/jpeg'
            if (!isPic) {
                message.error(`${file.name} is not an image`).then(r => r)
            } else {
                setFileList([file])
                handleUpload(file).then(r => r)
            }
            return false
        },
        fileList
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const onSubmitForm = async (values: RequestCollectionType) => {
        await dispatch(createCollection(values, id!))
        if (status === 'succeeded') {
            handleCancel()
            form.resetFields()
            dispatch(setImageUrl(null))
            setFileList([])
        }
    }

    const handleTextChange = useCallback((text: string) => {
        setCollectionText(text)
    }, [])

    return (
        <div style={{marginRight: 5}}>
            <Button onClick={handleOpen}
                    type="primary"
            >
                {t('collections.create')}
            </Button>
            <Modal
                open={open}
                title={t('collections.title')}
                onCancel={handleCancel}
                footer={[]}
                width={630}
            >
                <Form form={form}
                      name="normal_login"
                      className="login-form"
                      onFinish={onSubmitForm}
                      labelCol={{span: 4}}
                      wrapperCol={{span: 18}}
                >

                    <Form.Item
                        label={t('collections.name')}
                        name="name"
                        rules={[{required: true, min: 3, message: 'Please input name collection!'}]}
                    >
                        <Input placeholder={`${t('collections.name')}...`}/>
                    </Form.Item>

                    <Form.Item
                        label={t('collections.theme')}
                        name="theme"
                        hasFeedback
                        rules={[{required: true, message: 'Please select your theme!'}]}
                    >
                        <Select placeholder={t('collections.choiceTheme')}>
                            {theme.map((el, i) => (
                                <Option key={i} value={el.value}>{el.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label={t('collections.image')}>
                        <Dragger {...propsForUploadImage}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined/>
                            </p>
                            <p className="ant-upload-text">Click or drag image to this area to upload</p>
                        </Dragger>
                    </Form.Item>

                    <Form.Item label={t('collections.description')}
                               name="description"
                               rules={[{required: true, min: 3, message: 'Please input description collection!'}]}
                    >
                        <SimpleMdeReact id="description"
                                        placeholder={`${t('collections.description')}...`}
                                        value={collectionText}
                                        onChange={handleTextChange}
                                        options={CustomMarkdownOptions(collectionText)}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit"
                                type="primary"
                                className="login-form-button"
                                disabled={status === 'loading'}
                        >
                            {t('collections.submit')}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}