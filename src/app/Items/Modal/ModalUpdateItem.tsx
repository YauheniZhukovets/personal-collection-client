import React, {useCallback, useState} from 'react';
import {Button, Checkbox, DatePicker, Form, Input, InputNumber, Modal} from 'antd';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {StatusType} from '../../../type/Common';
import {useTranslation} from 'react-i18next';
import {Fields} from '../../../type/Fields';
import SimpleMdeReact from 'react-simplemde-editor';
import {Tags} from '../../../component/UI/Tags';
import {Item, RequestItemType} from '../../../models/Item';
import {createItem} from '../../../store/thunk/itemThunk';
import {useParams} from 'react-router-dom';
import {EditTwoTone} from '@ant-design/icons';
import moment from 'moment';

type ModalCreateItemType = {
    fieldsOptional: Fields[]
    item: Item
}

export const ModalUpdateItem: React.FC<ModalCreateItemType> = ({fieldsOptional, item}) => {
    const dateFormat = 'YYYY-MM-DD'
    const {t} = useTranslation()
    const {cId} = useParams<{ cId: string }>()
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>(false)
    const [collectionText1, setCollectionText1] = useState<string>('')
    const [collectionText2, setCollectionText2] = useState<string>('')
    const [collectionText3, setCollectionText3] = useState<string>('')
    const status = useAppSelector<StatusType>(state => state.app.status)

     const handleOpen = () => {
        setOpen(true)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    const onSubmitForm = async (values: RequestItemType) => {
        await dispatch(createItem({...values, collectionId: cId!}))
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
            <Button onClick={handleOpen}>
                <EditTwoTone/>
            </Button>

            <Modal
                open={open}
                title={'Create new item'}
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
                    <Form.Item label={'Title'}
                               name="title"
                               rules={[{required: true, min: 3, message: 'Please input name title!'}]}
                    >
                        <Input placeholder={`Title...`}/>
                    </Form.Item>

                    {fieldsOptional.map(f => f.description).includes('string1') &&
                        <Form.Item label={'Weight'}
                                   name={'string1'}
                        >
                            <Input placeholder={'Weight'}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('string2') &&
                        <Form.Item label={'Price'}
                                   name={'string2'}
                        >
                            <Input placeholder={'Price...'}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('string3') &&
                        <Form.Item label={'Sizes'}
                                   name={'string3'}
                        >
                            <Input placeholder={'Sizes...'}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('number1') &&
                        <Form.Item label={'Count'}
                                   name={'number1'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <InputNumber/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('number2') &&
                        <Form.Item label={'Total count release'}
                                   name={'number2'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <InputNumber/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('number3') &&
                        <Form.Item label={'Power'}
                                   name={'number3'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <InputNumber/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('boolean1') &&
                        <Form.Item label={'Has damage'}
                                   name={'boolean1'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                                   valuePropName="checked"
                        >
                            <Checkbox/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('boolean2') &&
                        <Form.Item label={'New'}
                                   name={'boolean2'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                                   valuePropName="checked"
                        >
                            <Checkbox/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('boolean3') &&
                        <Form.Item label={'Limited edition'}
                                   name={'boolean3'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                                   valuePropName="checked"
                        >
                            <Checkbox/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('date1') &&
                        <Form.Item label={'Release start date'}
                                   name={'date1'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <DatePicker format={dateFormat}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('date2') &&
                        <Form.Item label={'Release date'}
                                   name={'date2'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <DatePicker format={dateFormat}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('date3') &&
                        <Form.Item label={'Release end date'}
                                   name={'date3'}
                                   labelCol={{span: 6}}
                                   wrapperCol={{span: 16}}
                        >
                            <DatePicker format={dateFormat}/>
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('text1') &&
                        <Form.Item label={'Description'}
                                   name="text1"
                        >
                            <SimpleMdeReact id="text1"
                                            placeholder={`Description...`}
                                            value={collectionText1}
                                            onChange={handleTextChange1}
                            />
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('text2') &&
                        <Form.Item label={'About author'}
                                   name="text2"
                        >
                            <SimpleMdeReact id="text2"
                                            placeholder={`About author...`}
                                            value={collectionText2}
                                            onChange={handleTextChange2}
                            />
                        </Form.Item>
                    }
                    {fieldsOptional.map(f => f.description).includes('text3') &&
                        <Form.Item label={'History'}
                                   name="text3"
                        >
                            <SimpleMdeReact id="text3"
                                            placeholder={`History...`}
                                            value={collectionText3}
                                            onChange={handleTextChange3}
                            />
                        </Form.Item>
                    }
                    <Form.Item label={'Tags'}
                               name={'tags'}
                    >
                        <Tags name={'tags'} form={form} initialTags={item.tags}/>
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