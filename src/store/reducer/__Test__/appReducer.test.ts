import {appReducer, InitialStateAppType} from '../appReducer';
import {Tag} from '../../../models/Tag';
import {NullAnd} from '../../../type/NullAnd';
import {LanguageType} from '../../../type/Common';
import {setStatus} from '../../action/appAction';

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
});