import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import {userReducer} from './reducer/userReducer';
import {authReducer} from './reducer/authReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store