import React, {useState} from 'react';
import {Button, Form, Modal} from 'antd';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {StatusType} from '../../../type/Common';
import {EditTwoTone} from '@ant-design/icons';
import {useTranslation} from 'react-i18next';
import {IComment} from '../../../models/Comments';
import {updateComment} from '../../../store/thunk/commentThunk';
import TextArea from 'antd/es/input/TextArea';


type ModalUpdateCollectionType = {
    oldComment: IComment
}

export const ModalUpdateComment: React.FC<ModalUpdateCollectionType> = React.memo(({oldComment}) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()
    const [open, setOpen] = useState<boolean>(false)
    const status = useAppSelector<StatusType>(state => state.app.status)

    const handleCancel = () => {
        form.resetFields()
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const onSubmitForm = async (values: any) => {
        await dispatch(updateComment(oldComment.item, oldComment._id, values.comment))
        if (status === 'succeeded') {
            handleCancel()
            form.resetFields()
        }
    }

    return (
        <div style={{marginRight: 5}}>
            <Button onClick={handleOpen}>
                <EditTwoTone/>
            </Button>

            <Modal
                open={open}
                title={`Изменение коментария`}
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
                          {comment: oldComment.text}
                      }
                >

                    <Form.Item label={'Comment'}
                               name="comment"
                               rules={[{min: 1, message: 'Please input comment'}]}
                    >
                        <TextArea
                            showCount
                            maxLength={600}
                            style={{height: 120, resize: 'none', width: '100%'}}
                            placeholder="Comment..."
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