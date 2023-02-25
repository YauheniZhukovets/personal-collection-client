import React, {FC} from 'react';
import {Avatar, Button, List} from 'antd';
import {IconText} from '../../../component/UI/IconText';
import {DeleteTwoTone, FieldTimeOutlined, UserOutlined} from '@ant-design/icons';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {User} from '../../../models/User';
import {deleteComment} from '../../../store/thunk/commentThunk';
import {ModalUpdateComment} from './ModalUpdateComment';
import {IComment} from '../../../models/Comments';

type CommentType = {
    c: IComment
}

export const Comment: FC<CommentType> = ({c}) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector<User>(state => state.auth.user)

    const isValidUser = user._id === c.user._id || user.isAdmin

    const onClickDeleteComment = (commentId: string) => {
        dispatch(deleteComment(c.item, commentId))
    }
    return (
        <List.Item
            key={c._id}
            actions={[
                <IconText icon={UserOutlined} text={`${c.user.name}`}/>,
                <IconText icon={FieldTimeOutlined} text={`${c.updated.slice(0, 10)}`}/>,
                isValidUser && <ModalUpdateComment oldComment={c}/>,
                isValidUser && <Button onClick={() => onClickDeleteComment(c._id)}><DeleteTwoTone/></Button>
            ]}
        >
            <List.Item.Meta
                avatar={<Avatar/>}
                title={c.user.name}
                description={c.user.email}
            />
            {c.text}
        </List.Item>
    )
}