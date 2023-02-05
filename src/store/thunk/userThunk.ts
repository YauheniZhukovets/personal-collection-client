import {AppThunk} from '../../type/StoreTypes';
import {UserService} from '../../service/UserService';
import {setUsers} from '../action/userAction';
import axios from 'axios';

export const fetchUsers = (): AppThunk => async (dispatch) => {
    try {
        const res = await UserService.fetchUsers()
        dispatch(setUsers(res.data))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log(e.response?.data?.message)
        }
    }
}
