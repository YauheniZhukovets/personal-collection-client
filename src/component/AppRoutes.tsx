import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../hooks/hooks';
import {User} from '../models/User';
import {Home} from '../app/Home';
import {AdminPanel} from '../app/AdminPanel';
import {CollectionsList} from '../app/Collections/CollectionsList';

export const AppRoutes = () => {
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const user = useAppSelector<User>(state => state.auth.user)

    if (!isAuth) {
        return <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'*'} element={<Navigate to={'/'} replace/>}/>
        </Routes>
    }

    return (
        <Routes>
            {
                user.isAdmin && <Route path={'/admin'} element={<AdminPanel/>}/>
            }
            <Route path={'/collections'} element={<CollectionsList/>}>
                <Route path={'/collections/' + ':id'} element={<CollectionsList/>}/>
            </Route>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'*'} element={<Navigate to={'/'} replace/>}/>
        </Routes>
    )
}
