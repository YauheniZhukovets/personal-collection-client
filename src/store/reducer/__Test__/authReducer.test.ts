import { InitialStateAuthType } from '../authReducer'

import { User } from 'models'
import { setAuth, setInitialize } from 'store/action/'
import { authReducer } from 'store/reducer'

let startState: InitialStateAuthType

beforeEach(() => {
  startState = {
    user: {} as User,
    isAuth: false,
    isInitialize: false,
  }
})

test('must be should initialized', () => {
  const action = setInitialize()
  const newState = authReducer(startState, action)

  expect(newState.isInitialize).toBeTruthy()
})

test('must be should authorize', () => {
  const action = setAuth(true)
  const newState = authReducer(startState, action)

  expect(newState.isAuth).toBeTruthy()
})
