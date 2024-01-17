import { createAction, props } from '@ngrx/store';
import { ResponseModel } from '../../../models/response.model';
import { BoardModel } from '../../../models/boards/board.model';


export const clearStoreFlags = createAction('[Board] Clear Store Flags');

export const clearBoard = createAction('[Board] Clear Board');

export const loadBoard = createAction(
    '[Board] Load Board'
);

export const loadBoardSuccess = createAction(
    '[Board] Load Board Success',
    props<{ response: ResponseModel<BoardModel> }>()
);

export const loadBoardFail = createAction('[Board] Load Board Fail');

// Create Board
export const createBoard = createAction(
    '[Board] Create Board',
    props<{ request: BoardModel }>()
)

export const createBoardSsuccess = createAction(
    '[Board] Create Board Success',
    props<{ response: BoardModel }>()
)

export const createBoardFail = createAction(
    '[Board] Create Board Fail'
)
