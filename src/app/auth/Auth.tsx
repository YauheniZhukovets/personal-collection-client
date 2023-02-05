import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {login, registration} from '../../store/thunk/authThunk';
import {routes} from '../../shared/constants/routes';
import {Navigate} from 'react-router-dom';

export const Auth: FC = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onLoginClick = () => {
        dispatch(login(email, password))
    }

    const onRegistrationClick = () => {
        dispatch(registration(email, password))
    }

    if (isAuth) {
        return <Navigate to={routes.HOME}/>
    }

    return (
        <div>
            <input type="text"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Email"
            />

            <input type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Password"
            />
            <button onClick={onLoginClick}>Логин</button>
            <button onClick={onRegistrationClick}>Регистрация</button>
        </div>
    )
}