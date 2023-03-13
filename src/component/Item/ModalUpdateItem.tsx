import React, {useCallback, useState} from 'react';
import {Button, Checkbox, DatePicker, Form, Input, InputNumber, Modal} from 'antd';


import {useTranslation} from 'react-i18next';

import SimpleMdeReact from 'react-simplemde-editor';

import {useParams} from 'react-router-dom';
import {EditTwoTone} from '@ant-design/icons';
import moment from 'moment';
import {Item} from 'models';
import {useAppDispatch, useAppSelector} from 'hooks';
import {Fields, StatusType} from 'type';
import {TagsUI} from 'component';
import {updateItem} from 'store/thunk';


type ModalCreateItemType = {
    fieldsOptional: Fields[]
    item: Item
}

export const ModalUpdateItem: React.FC<ModalCreateItemType> = React.memo(({fieldsOptional, item}) => {
    const dateFormat = 'YYYY-MM-DD'
    const {t} = useTranslation()
    const {id, cId} = useParams<{ id: string, cId: string }>()
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>(false)
    const [tags, setTags] = useState<string[]>(item.tags || [])
    const [collectionText1, setCollectionText1] = useState<string>('')
    const [collectionText2, setCollectionText2] = useState<string>('')
    const [collectionText3, setCollectionText3] = useState<string>('')
    const status = useAppSelector<StatusType>(state => state.app.status)
    const user = useAppSelector(state => state.auth.user)
    const disable = user._id !== id && !user.isAdmin

    const handleOpen = () => {
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const onSubmitForm = async (fieldsValues: any) => {
        const values = {
            ...fieldsValues,
            date1: fieldsValues.date1?.format(dateFormat),
            date2: fieldsValues.date2?.format(dateFormat),
            date3: fieldsValues.date3?.format(dateFormat),
        }

        await dispatch(updateItem({...values, collectionId: cId!}, id!, item._id))
        if (status === 'succeeded') {
            handleCancel()
            form.resetFields()
        }
    }

    const handleTextChange1 = useCallback((text: string) => {
        setCollectionText1(text)
    }, [])
    const handleTextChange2 = useCallback((text: string) => {
        setCollectionText2(text)
    }, [])
    const handleTextChange3 = useCallback((text: string) => {
        setCollectionText3(text)
    }, [])

    return (
        <div>
            <Button disabled={disable} onClick={handleOpen}>
                <EditTwoTone/>
            </Button>

            <Modal
                open={open}
                title={t('item.titleUpdate')}
                onCancel={handleCancel}
                footer={[]}
                width={640}
            >
                <Form form={form}
                      name="create-item"
                      onFinish={onSubmitForm}
                      labelCol={{span: 4}}
                      wrapperCol={{span: 18}}
                      initialValues={{
                          title: item.title,
                          string1: item.string1,
                          string2: item.string2,
                          string3: item.string3,
                          text1: item.text1,
                          text2: item.text2,
                          text3: item.text3,
                          number1: item.number1,
                          number2: item.number2,
                          number3: item.number3,
                          boolean1: item.boolean1,
                          boolean2: item.boolean2,
                          boolean3: item.boolean3,
                          date1: moment(item.date1, dateFormat),
                          date2: moment(item.date2, dateFormat),
                          date3: moment(item.date3, dateFormat),
                      }}
                >
                    <Form.Item label={t('item.name')}
                               name="title"
                               rules={[{required: true, message: 'Please input title!'}]}
                    >
                        <Input placeholder={`${t('item.name')}...`}/>
                    </Form.Item>

                    {fieldsOptional.map(f => f.description).includes('string1') &&
                        <Form.Item label={t('item.string1')}
                                   name={'string1'}
                        >
                            <Input placeholder={`${t('item.string1')}...`}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('string2') &&
                        <Form.Item label={t('item.string2')}
                                   name={'string2'}
                        >
                            <Input placeholder={`${t('item.string2')}...`}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('string3') &&
                        <Form.Item label={t('item.string3')}
                                   name={'string3'}
                        >
                            <Input placeholder={`${t('item.string3')}...`}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('number1') &&
                        <Form.Item label={t('item.number1')}
                                   name={'number1'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <InputNumber/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('number2') &&
                        <Form.Item label={t('item.number2')}
                                   name={'number2'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <InputNumber/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('number3') &&
                        <Form.Item label={t('item.number3')}
                                   name={'number3'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <InputNumber/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('boolean1') &&
                        <Form.Item label={t('item.boolean1')}
                                   name={'boolean1'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                                   valuePropName="checked"
                        >
                            <Checkbox/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('boolean2') &&
                        <Form.Item label={t('item.boolean2')}
                                   name={'boolean2'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                                   valuePropName="checked"
                        >
                            <Checkbox/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('boolean3') &&
                        <Form.Item label={t('item.boolean3')}
                                   name={'boolean3'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                                   valuePropName="checked"
                        >
                            <Checkbox/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('date1') &&
                        <Form.Item label={t('item.date1')}
                                   name={'date1'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <DatePicker format={dateFormat}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('date2') &&
                        <Form.Item label={t('item.date2')}
                                   name={'date2'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <DatePicker format={dateFormat}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('date3') &&
                        <Form.Item label={t('item.date3')}
                                   name={'date3'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <DatePicker format={dateFormat}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('text1') &&
                        <Form.Item label={t('item.text1')}
                                   name="text1"
                        >
                            <SimpleMdeReact id="text1"
                                            placeholder={`${t('item.text1')}...`}
                                            value={collectionText1}
                                            onChange={handleTextChange1}
                            />
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('text2') &&
                        <Form.Item label={t('item.text2')}
                                   name="text2"
                        >
                            <SimpleMdeReact id="text2"
                                            placeholder={`${t('item.text2')}...`}
                                            value={collectionText2}
                                            onChange={handleTextChange2}
                            />
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('text3') &&
                        <Form.Item label={t('item.text3')}
                                   name="text3"
                        >
                            <SimpleMdeReact id="text3"
                                            placeholder={`${t('item.text3')}...`}
                                            value={collectionText3}
                                            onChange={handleTextChange3}
                            />
                        </Form.Item>
                    }
                    <Form.Item label={t('item.tags')}
                               name={'tags'}
                    >
                        <TagsUI name={'tags'}
                                form={form}
                                tags={tags}
                                setTags={setTags}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit"
                                type="primary"
                                disabled={status === 'loading'}
                        >
                            {t('item.update')}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
})