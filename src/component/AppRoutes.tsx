import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../hooks/hooks';
import {Home} from '../app/Home';
import {AdminPanel} from '../app/AdminPanel';
import {CollectionsList} from '../app/Collections/CollectionsList';
import {routes} from '../shared/routes';
import {Items} from '../app/Items/Items.';

export const AppRoutes = () => {
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const isAdmin = useAppSelector<boolean>(state => state.auth.user.isAdmin)

    if (!isAuth) {
        return (
            <Routes>
                <Route path={routes.HOME} element={<Home/>}/>
                <Route path={'*'} element={<Navigate to={routes.HOME} replace/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            {
                isAdmin && <Route path={routes.ADMIN} element={<AdminPanel/>}/>
            }
            <Route path={routes.COLLECTIONS} element={<CollectionsList/>}>
                <Route path={`:id`} element={<CollectionsList/>}/>
            </Route>
            <Route path={`${routes.COLLECTIONS}/:id${routes.ITEMS}/:cId`} element={<Items/>}/>
            <Route path={routes.HOME} element={<Home/>}/>
            <Route path={'*'} element={<Navigate to={routes.HOME} replace/>}/>
        </Routes>
    )
}
