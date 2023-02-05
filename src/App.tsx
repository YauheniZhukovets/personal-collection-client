import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {checkAuth} from './store/thunk/authThunk';
import {AppRoutes} from './routes/AppRoutes';

export const App = () => {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector<boolean>(state => state.auth.isLoading)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <AppRoutes/>
        </div>
    )
}




