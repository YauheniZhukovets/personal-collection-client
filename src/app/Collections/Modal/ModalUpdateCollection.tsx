import React, {useCallback, useEffect, useState} from 'react';
import {Button, Form, Input, message, Modal, Select, UploadProps} from 'antd';
import {useAppDispatch, useAppSelector, useTranslateOptions} from '../../../hooks/hooks';
import {StatusType} from '../../../type/Common';
import {uploadImage} from '../../../store/thunk/uploadThunk';
import {DeleteTwoTone, EditTwoTone, InboxOutlined} from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import {RcFile} from 'antd/es/upload';
import {setImageUrl} from '../../../store/action/collectionAction';
import SimpleMdeReact from 'react-simplemde-editor';
import {CustomMarkdownOptions} from '../../../component/CustomMarkdownOptions';
import {useTranslation} from 'react-i18next';
import {updateCollection} from '../../../store/thunk/collectionThunk';
import {Collection, RequestCollectionType} from '../../../models/Collection';
import {useParams} from 'react-router-dom';
import {themes} from '../../../shared/themeOptions';
import {NullAnd} from '../../../type/NullAnd';

const {Option} = Select

type ModalUpdateCollectionType = {
    oldDateItem: Collection
}

export const ModalUpdateCollection: React.FC<ModalUpdateCollectionType> = ({oldDateItem}) => {
    const {t} = useTranslation()
    const theme = useTranslateOptions(themes, 'themes')
    const dispatch = useAppDispatch()
    const status = useAppSelector<StatusType>(state => state.app.status)
    const image = useAppSelector<NullAnd<string>>(state => state.collection.imageUrl)
    const {id} = useParams<{ id: string }>()
    const [fileList, setFileList] = useState<RcFile[]>([])
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const [collectionText, setCollectionText] = useState<string>('')

    useEffect(() => {
        if (oldDateItem) {
            return
        }
    }, [oldDateItem])


    const handleUpload = async (file: RcFile) => {
        await dispatch(uploadImage(file))
        message.success(`${file.name} success upload`)
    }

    const handleCancel = () => {
        form.resetFields()
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
        dispatch(setImageUrl(oldDateItem.image!))
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

    const onSubmitForm = async (values: RequestCollectionType) => {
        await dispatch(updateCollection({...values, _id: oldDateItem._id}, id!))
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

    const onDeleteOldImage = () => {
        dispatch(setImageUrl(null))
    }
    return (
        <div style={{marginRight: 5}}>
            <Button onClick={handleOpen}>
                <EditTwoTone/>
            </Button>

            <Modal
                open={open}
                title={`${t('collections.titleUpdate')}`}
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
                      initialValues={
                          {
                              name: oldDateItem.name,
                              theme: oldDateItem.theme,
                              description: oldDateItem.description
                          }
                      }
                >

                    <Form.Item
                        label={t('collections.name')}
                        name="name"
                        rules={[{min: 3, message: 'Please input name collection!'}]}
                    >
                        <Input placeholder={`${t('collections.name')}...`}/>
                    </Form.Item>

                    <Form.Item
                        label={t('collections.theme')}
                        name="theme"
                        hasFeedback
                        rules={[{message: 'Please select your theme!'}]}
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
                        {
                            image && oldDateItem.image
                                ?
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 5
                                }}>
                                    <div>{`${oldDateItem && oldDateItem.image?.slice(0, 55)}...`}</div>
                                    <Button onClick={onDeleteOldImage}>
                                        <DeleteTwoTone/>
                                    </Button>
                                </div>

                                : <></>
                        }
                    </Form.Item>

                    <Form.Item label={t('collections.description')}
                               name="description"
                               rules={[{min: 3, message: 'Please input description collection!'}]}
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
                            {t('collections.update')}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}