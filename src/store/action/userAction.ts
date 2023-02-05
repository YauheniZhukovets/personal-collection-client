import {User} from '../../models/User';

export const setUsers = (users: User[]) => {
    return {type: 'USER/SET-USERS', users} as const
}
