import React, {useCallback, useState} from 'react';
import {Button, Form, Input, message, Modal, Select, Transfer, UploadProps} from 'antd';
import {useAppDispatch, useAppSelector, useTranslateOptions} from '../../../hooks/hooks';
import {StatusType} from '../../../type/Common';
import {uploadImage} from '../../../store/thunk/uploadThunk';
import {InboxOutlined} from '@ant-design/icons';
import Dragger from 'antd/es/upload/Dragger';
import {RcFile} from 'antd/es/upload';
import {setImageUrl} from '../../../store/action/collectionAction';
import SimpleMdeReact from 'react-simplemde-editor';
import {useTranslation} from 'react-i18next';
import {RequestCollectionType} from '../../../models/Collection';
import {useParams} from 'react-router-dom';
import {themes} from '../../../shared/themeOptions';
import {fields} from '../../../shared/fields';
import {createCollection} from '../../../store/thunk/collectionThunk';

const {Option} = Select

export const ModalCreateCollection: React.FC = () => {
    const {id} = useParams<{ id: string }>()
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()
    const theme = useTranslateOptions(themes, 'themes')
    const [open, setOpen] = useState(false)
    const [fileList, setFileList] = useState<RcFile[]>([])
    const [collectionText, setCollectionText] = useState('')
    const [targetKeys, setTargetKeys] = useState<string[]>([])
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const status = useAppSelector<StatusType>(state => state.app.status)

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

    const propsForUploadImage: UploadProps = {
        onRemove: () => {
            dispatch(setImageUrl(null))
            setFileList([])
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
            setTargetKeys([])
            setSelectedKeys([])
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
                width={640}
            >
                <Form form={form}
                      name="create-collection"
                      onFinish={onSubmitForm}
                      labelCol={{span: 4}}
                      wrapperCol={{span: 18}}
                >

                    <Form.Item label={t('collections.name')}
                               name="name"
                               rules={[{required: true, min: 3, message: 'Please input name collection!'}]}
                    >
                        <Input placeholder={`${t('collections.name')}...`}/>
                    </Form.Item>

                    <Form.Item label={t('collections.theme')}
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
                            {t('collections.submit')}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}