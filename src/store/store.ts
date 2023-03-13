import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import {
  userReducer,
  authReducer,
  appReducer,
  collectionReducer,
  itemReducer,
  commentsReducer,
} from 'store/reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  collection: collectionReducer,
  item: itemReducer,
  comments: commentsReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

//@ts-ignore
window.store = store
