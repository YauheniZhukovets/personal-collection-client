import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../hooks/hooks';
import {User} from '../models/User';
import {Home} from '../app/Home';
import {AdminPanel} from '../app/AdminPanel';
import {CollectionsList} from '../app/Collections/CollectionsList';
import {routes} from '../shared/routes';

export const AppRoutes = () => {
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const user = useAppSelector<User>(state => state.auth.user)

    if (!isAuth) {
        return <Routes>
            <Route path={routes.HOME} element={<Home/>}/>
            <Route path={'*'} element={<Navigate to={routes.HOME} replace/>}/>
        </Routes>
    }

    return (
        <Routes>
            {
                user.isAdmin && <Route path={routes.ADMIN} element={<AdminPanel/>}/>
            }
            <Route path={routes.COLLECTIONS} element={<CollectionsList/>}>
                <Route path={`${routes.COLLECTIONS}/:id`} element={<CollectionsList/>}/>
            </Route>
            <Route path={routes.HOME} element={<Home/>}/>
            <Route path={'*'} element={<Navigate to={routes.HOME} replace/>}/>
        </Routes>
    )
}
