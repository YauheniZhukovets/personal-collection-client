import {IComment} from '../../models/Comments';

export const setComments = (comments: IComment[]) => {
    return {type: 'COMMENTS/SET-COMMENTS', comments} as const
}
