import React, {FC} from 'react';
import {Button, Card, message} from 'antd';
import {DislikeOutlined, LikeOutlined} from '@ant-design/icons';
import {Item} from '../../models/Item';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {dislikeItem, likeItem} from '../../store/thunk/likeThunk';
import {useParams} from 'react-router-dom';

type LikeProps = {
    item: Item
}

export const Like: FC<LikeProps> = ({item}) => {
    const dispatch = useAppDispatch()
    const {cId} = useParams<{ id: string, cId: string }>()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const userId = useAppSelector(state => state.auth.user._id)
    const like = item.likes.find(l => l.user === userId)

    const onClickLike = () => {
        if (isAuth) {
            !like && dispatch(likeItem(cId!, item._id))
            !!like && dispatch(dislikeItem(cId!, item._id))
        } else {
            message.error('Please register or login')
        }
    }

    return (
        <Card>
            <Button onClick={onClickLike}
                    type="primary"
                    icon={!!like ? <DislikeOutlined/> : <LikeOutlined/>}
                    disabled={!isAuth}
            />
            <span style={{paddingLeft: 10}}>{item.likes.length}</span>
        </Card>
    )
}