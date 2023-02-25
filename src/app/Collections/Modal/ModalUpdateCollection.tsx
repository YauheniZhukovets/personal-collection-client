import React, {useCallback, useState} from 'react';
import {Button, Form, Input, message, Modal, Select, Transfer, UploadProps} from 'antd';
import {useAppDispatch, useAppSelector, useTranslateOptions} from '../../../hooks/hooks';
import {StatusType} from '../../../type/Common';
import {uploadImage} from '../../../store/thunk/uploadThunk';
import {DeleteTwoTone, EditTwoTone, InboxOutlined} from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import {RcFile} from 'antd/es/upload';
import {setImageUrl} from '../../../store/action/collectionAction';
import SimpleMdeReact from 'react-simplemde-editor';
import {useTranslation} from 'react-i18next';
import {updateCollection} from '../../../store/thunk/collectionThunk';
import {Collection, RequestCollectionType} from '../../../models/Collection';
import {useParams} from 'react-router-dom';
import {themes} from '../../../shared/themeOptions';
import {NullAnd} from '../../../type/NullAnd';
import {fields} from '../../../shared/fields';

const {Option} = Select

type ModalUpdateCollectionType = {
    oldDateItem: Collection
}

export const ModalUpdateCollection: React.FC<ModalUpdateCollectionType> = ({oldDateItem}) => {
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
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)


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
            <Button disabled={!isAuth} onClick={handleOpen}>
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
                        />
                    </Form.Item>

                    <Form.Item label={t('collections.fields')}
                               name="fields"
                    >
                        <Transfer
                            dataSource={fields}
                            titles={['Source', 'Target']}
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
}