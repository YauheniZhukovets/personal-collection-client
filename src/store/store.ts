import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {userReducer} from './reducer/userReducer';
import {authReducer} from './reducer/authReducer';
import {appReducer} from './reducer/appReducer';
import {collectionReducer} from './reducer/collectionReducer';


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    collection: collectionReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

//@ts-ignore
window.store = store