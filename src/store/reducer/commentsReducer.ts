import { IComment } from 'models'
import { ActionCommentsType } from 'store/type'

const initialState = {
  comments: [] as IComment[],
}

type InitialStateType = typeof initialState

export const commentsReducer = (
  state = initialState,
  action: ActionCommentsType
): InitialStateType => {
  switch (action.type) {
    case 'COMMENTS/SET-COMMENTS': {
      return { ...state, comments: action.comments }
    }
    default:
      return state
  }
}
