import { User } from 'models'
import { ActionAuthType } from 'store/type'

const initialState = {
  user: {} as User,
  isAuth: false,
  isInitialize: false,
}

export type InitialStateAuthType = typeof initialState

export const authReducer = (state = initialState, action: ActionAuthType): InitialStateAuthType => {
  switch (action.type) {
    case 'AUTH/SET-AUTH': {
      return { ...state, isAuth: action.isAuth }
    }
    case 'AUTH/SET-USER': {
      return { ...state, user: action.user }
    }
    case 'AUTH/SET-INITIALIZE': {
      return { ...state, isInitialize: true }
    }
    default:
      return state
  }
}
