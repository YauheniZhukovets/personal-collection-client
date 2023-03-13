import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {routes} from 'shared';
import {useAppSelector} from 'hooks';
import {AdminPanel, CollectionsList, Home, ItemPage, ItemsTable} from '../pages';


export const AppRoutes = () => {
    const isAdmin = useAppSelector<boolean>(state => state.auth.user.isAdmin)

    return (
        <Routes>
            {
                isAdmin && <Route path={routes.ADMIN} element={<AdminPanel/>}/>
            }
            <Route path={routes.COLLECTIONS} element={<CollectionsList/>}>
                <Route path={`:id`} element={<CollectionsList/>}/>
            </Route>
            <Route path={`${routes.COLLECTIONS}/:id${routes.ITEMS}/:cId`} element={<ItemsTable/>}/>
            <Route path={`${routes.COLLECTIONS}/:id${routes.ITEMS}/:cId${routes.ITEM}/:iId`} element={<ItemPage/>}/>
            <Route path={routes.HOME} element={<Home/>}/>
            <Route path={'*'} element={<Navigate to={routes.HOME} replace/>}/>
        </Routes>
    )
}
