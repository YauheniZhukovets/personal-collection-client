import React, {useCallback, useState} from 'react';
import {Button, Form, Input, message, Modal, Select, Transfer, UploadProps} from 'antd';

import {DeleteTwoTone, EditTwoTone, InboxOutlined} from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import {RcFile} from 'antd/es/upload';

import SimpleMdeReact from 'react-simplemde-editor';
import {useTranslation} from 'react-i18next';

import {useParams} from 'react-router-dom';
import {setImageUrl} from 'store/action';
import {fields, themes} from 'shared';
import {NullAnd, StatusType} from 'type';
import {useAppDispatch, useAppSelector, useTranslateOptions} from 'hooks';
import {updateCollection, uploadImage} from 'store/thunk';
import {Collection, RequestCollectionType} from 'models';


const {Option} = Select

type ModalUpdateCollectionType = {
    oldDateItem: Collection
}

export const ModalUpdateCollection: React.FC<ModalUpdateCollectionType> = React.memo(({oldDateItem}) => {
    const {id} = useParams<{ id: string }>()
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const theme = useTranslateOptions(themes, 'themes')
    const [form] = Form.useForm()
    const [open, setOpen] = useState<boolean>(false)
    const [fileList, setFileList] = useState<RcFile[]>([])
    const [collectionText, setCollectionText] = useState<string>('')
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [targetKeys, setTargetKeys] = useState<string[]>(oldDateItem.fields || [])
    const status = useAppSelector<StatusType>(state => state.app.status)
    const image = useAppSelector<NullAnd<string>>(state => state.collection.imageUrl)

    const user = useAppSelector(state => state.auth.user)
    const disable = user._id !== id && !user.isAdmin

    const handleChange = (newTargetKeys: string[]) => {
        setTargetKeys(newTargetKeys)
    }
    const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
    }


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
        beforeUpload: (image) => {
            const isPic = image.type === 'image/png' || image.type === 'image/jpeg'
            if (!isPic) {
                message.error(`${image.name} is not an image`).then(r => r)
            } else {
                setFileList([image])
                handleUpload(image).then(r => r)
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
            <Button disabled={disable} onClick={handleOpen}>
                <EditTwoTone/>
            </Button>

            <Modal
                open={open}
                title={`${t('collections.titleUpdate')}`}
                onCancel={handleCancel}
                footer={[]}
                width={640}
            >
                <Form form={form}
                      name="update-collection"
                      onFinish={onSubmitForm}
                      labelCol={{span: 4}}
                      wrapperCol={{span: 18}}
                      initialValues={
                          {
                              name: oldDateItem.name,
                              theme: oldDateItem.theme,
                              description: oldDateItem.description,
                              fields: oldDateItem.fields,
                          }
                      }
                >

                    <Form.Item label={t('collections.name')}
                               name="name"
                               rules={[{min: 3, message: 'Please input name collection!'}]}
                    >
                        <Input placeholder={`${t('collections.name')}...`}/>
                    </Form.Item>

                    <Form.Item label={t('collections.theme')}
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
                            <p className="ant-upload-text">{t('collections.dragInfo')}</p>
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
                        />
                    </Form.Item>

                    <Form.Item label={t('collections.fields')}
                               name="fields"
                    >
                        <Transfer
                            dataSource={fields}
                            titles={[`${t('collections.all')}`, `${t('collections.selected')}`]}
                            targetKeys={targetKeys}
                            selectedKeys={selectedKeys}
                            onChange={handleChange}
                            onSelectChange={handleSelectChange}
                            render={(item) => item.title}
                            oneWay
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit"
                                type="primary"
                                disabled={status === 'loading'}
                        >
                            {t('collections.update')}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
})