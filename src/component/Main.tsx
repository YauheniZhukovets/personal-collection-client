import React, {FC} from 'react';

import {Card, Carousel, Divider, Empty, Image} from 'antd';
import s from '../component/Collections/Collections.module.css';
import Meta from 'antd/es/card/Meta';
import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {ReactMarkdown} from 'react-markdown/lib/react-markdown';
import {useAppSelector} from 'hooks';
import {Collection, Item} from 'models';
import {routes} from 'shared';
import {ErrorImage} from 'component';

const contentStyle: React.CSSProperties = {
    margin: 0,
    textAlign: 'center',
    background: '#b9b9b9',
}
export const Main: FC = React.memo(() => {
    const {t} = useTranslation()
    const latestItems = useAppSelector<Item[]>(state => state.item.latestItems)
    const maxItemCollections = useAppSelector<Collection[]>(state => state.collection.maxItemCollections)

    return (
        <>
            <Divider plain><span>{t('main.collectionsInfo')}</span></Divider>
            {
                maxItemCollections.length
                    ? <Carousel effect="fade">
                        {maxItemCollections.map(el => {
                            return (
                                <div key={el._id}>
                                    <Card title={(
                                        <NavLink to={`${routes.COLLECTIONS}/${el.user._id}`}>
                                            {el.user.name || el.user.email}
                                        </NavLink>
                                    )}
                                          style={contentStyle}
                                          cover={<div className={s.imgWrap}>
                                              {
                                                  el.image !== null

                                                      ? <Image width={250}
                                                               height={150}
                                                               src={`${el.image}`}
                                                      />
                                                      : <ErrorImage/>
                                              }
                                          </div>
                                          }
                                    >
                                        <Meta
                                            title={(
                                                <NavLink
                                                    to={`${routes.COLLECTIONS}/${el.user._id}${routes.ITEMS}/${el._id}`}>
                                                    {el.name}
                                                </NavLink>
                                            )}
                                            description={el.theme}
                                        />
                                        <ReactMarkdown children={`${el.description.slice(0, 40)}...`}/>
                                        <p>{`${t('main.itemCount')}: ${el.itemsCount}`}</p>
                                    </Card>
                                </div>

                            )
                        })}
                    </Carousel>
                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            }
            <Divider plain><span>{t('main.itemsInfo')}</span></Divider>
            {
                latestItems.length
                    ? <Carousel effect="fade">
                        {latestItems.map(el => {
                            return (
                                <div key={el._id}>
                                    <Card style={contentStyle}
                                          title={
                                              <NavLink to={`${routes.COLLECTIONS}/${el.user._id}`}>
                                                  {el.user.name || el.user.email}
                                              </NavLink>
                                          }
                                    >
                                        <Meta
                                            title={(
                                                <NavLink
                                                    to={`${routes.COLLECTIONS}/${el.user._id}${routes.ITEMS}/${el.collectionName._id}${routes.ITEM}/${el._id}`}
                                                >
                                                    {el.title}
                                                </NavLink>
                                            )}
                                            description={`${el.created.slice(0, 10)}`}
                                        />
                                        <p>{t('main.likeCount')}: {el.likes.length}</p>
                                        <p>{t('main.commentCount')}: {el.countComments}</p>
                                    </Card>
                                </div>

                            )
                        })}
                    </Carousel>
                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            }
        </>
    )
})