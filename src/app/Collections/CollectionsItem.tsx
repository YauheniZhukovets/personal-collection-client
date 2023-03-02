import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {NavLink, useParams} from 'react-router-dom';
import {Collection} from '../../models/Collection';
import {Button, Image, List} from 'antd';
import {DeleteTwoTone, FileOutlined, UserOutlined} from '@ant-design/icons';
import {IconText} from '../../component/UI/IconText';
import s from './Collections.module.css'
import {ReactMarkdown} from 'react-markdown/lib/react-markdown';
import {deleteCollection} from '../../store/thunk/collectionThunk';
import {ErrorImage} from '../../component/UI/ErrorImage';
import {ModalUpdateCollection} from './Modal/ModalUpdateCollection';
import {routes} from '../../shared/routes';


type CollectionsItemProps = {
    item: Collection
}

export const CollectionsItem: FC<CollectionsItemProps> = React.memo(({item}) => {
    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()

    const user = useAppSelector(state => state.auth.user)
    const disable = user._id !== id && !user.isAdmin

    const onClickRemoveCollection = (collectionId: string) => {
        dispatch(deleteCollection(id!, collectionId))
    }

    return (
        <>
            <List.Item
                key={item._id}
                actions={[
                    <IconText icon={UserOutlined} text={`${item.user.name}`} key="list-vertical-user"/>,
                    <IconText icon={FileOutlined} text={`${item.itemsCount}`} key="list-vertical-count-item"/>,
                    <ModalUpdateCollection oldDateItem={item}/>,
                    <Button disabled={disable} onClick={() => onClickRemoveCollection(item._id)}>
                        <DeleteTwoTone/>
                    </Button>,
                ]}
                extra={
                    item.image !== null
                        ?
                        <div className={s.imgWrap}>
                            <Image src={`${item.image}`}/>
                        </div>
                        :
                        <ErrorImage/>
                }
            >
                <List.Item.Meta
                    title={
                        <NavLink to={`${routes.COLLECTIONS}/${id}${routes.ITEMS}/${item._id}`}>
                            {item.name}
                        </NavLink>
                    }
                    description={item.theme}
                />
                <ReactMarkdown children={item.description}/>
            </List.Item>
        </>
    )
})