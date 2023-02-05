import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {User} from '../../models/User';
import {logout} from '../../store/thunk/authThunk';
import {fetchUsers} from '../../store/thunk/userThunk';
import {routes} from '../../shared/constants/routes';
import {Navigate} from 'react-router-dom';

export const Home: FC = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector<boolean>(state => state.auth.isAuth)
    const email = useAppSelector<string>(state => state.auth.user.email)
    const users = useAppSelector<User []>(state => state.user.users)

    const onLogoutClick = () => {
        dispatch(logout())
    }

    const onGetUsersClick = () => {
        dispatch(fetchUsers())
    }

    if (!isAuth) {
        return <Navigate to={routes.LOGIN}/>
    }

    return (
        <div>
            <h1>{isAuth ? `Пользователь авторизован ${email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <button onClick={onLogoutClick}>logout</button>
            <div>
                <button onClick={onGetUsersClick}>Получить пользователей</button>
            </div>
            {users.map((u) => {
                return (
                    <div key={u._id}>{u.email}</div>
                )
            })}
        </div>
    )
}