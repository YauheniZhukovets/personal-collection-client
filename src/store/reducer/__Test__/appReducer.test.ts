import { Tag } from 'models'
import { setStatus } from 'store/action'
import { appReducer, InitialStateAppType } from 'store/reducer/appReducer'
import { NullAnd, LanguageType } from 'type'

let startState: InitialStateAppType

beforeEach(() => {
  startState = {
    status: 'idle',
    tags: [] as Tag[],
    selectedTags: [] as string[],
    error: null as NullAnd<string>,
    search: '',
    language: 'en' as LanguageType,
  }
})

test('after change must be status should succeeded', () => {
  const action = setStatus('succeeded')
  const newState = appReducer(startState, action)

  expect(newState.status).toBe('succeeded')
})
