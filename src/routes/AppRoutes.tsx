import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {routes} from '../shared/constants/routes';
import {Home} from '../app/home/Home';
import {Auth} from '../app/auth/Auth';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={routes.HOME} element={<Home/>}/>
            <Route path={routes.LOGIN} element={<Auth/>}/>
        </Routes>
    );
}
