import React, {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {googleAuth} from '../../store/thunk/authThunk';
import {useNavigate} from 'react-router-dom';
import {routes} from '../../shared/routes';

export const GoogleAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(googleAuth())
        navigate(routes.HOME)
    }, [])

    return (
        <>
            Google Auth
        </>
    )
}
