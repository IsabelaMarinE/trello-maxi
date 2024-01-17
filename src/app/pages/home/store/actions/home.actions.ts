import { createAction, props } from '@ngrx/store';
import { BoardModel } from '../../models/board.model';
import { ResponseModel } from '../../../../shared/models/response.model';



export const clearStoreFlags = createAction('[Post] Clear Store Flags');

export const clearPosts = createAction('[Post] Clear Posts');

export const loadPosts = createAction(
    '[Post] Load Posts'
);

export const loadPostsSuccess = createAction(
    '[Post] Load Posts Success',
    props<{ response: ResponseModel<BoardModel> }>()
);

export const loadPostsFail = createAction('[Post] Load Posts Fail');

// Get Post By User
export const loadPostUser = createAction(
    '[Post] Load Post',
    props<{ id: string }>()
);

export const loadPostUserSuccess = createAction(
    '[Post] Load Post Success',
    props<{ response: ResponseModel<BoardModel> }>()
)

export const loadPostUserFail = createAction(
    '[Post] Load Post Fail',
    props<{ error: any }>()
)


// Create Post
export const createPost = createAction(
    '[Post] Create Post',
    props<{ request: BoardModel }>()
)

export const createPostSuccess = createAction(
    '[Post] Create Post Success',
    props<{ response: BoardModel }>()
)

export const createPostFail = createAction(
    '[Post] Create Post Fail'
)

// Filter Post title
export const filterPostTitle = createAction(
    '[Post] filterPostTitle Post',
    props<{ text: string }>()
)

export const filterPostTitleSuccess = createAction(
    '[Post] filterPostTitle Post Success',
    props<{ response: ResponseModel<BoardModel> }>()
)

export const filterPostTitleFail = createAction(
    '[Post] filterPostTitle Post Fail',
    props<{ error: any }>()
)

// Filter Post Date
export const filterPostDate = createAction(
  '[Post] filterPostDate Post',
  props<{ date: Date }>()
)

export const filterPostDateSuccess = createAction(
  '[Post] filterPostDate Post Success',
  props<{ response: ResponseModel<BoardModel> }>()
)

export const filterPostDateFail = createAction(
  '[Post] filterPostDate Post Fail',
  props<{ error: any }>()
)
