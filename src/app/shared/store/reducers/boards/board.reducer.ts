import { Action, createReducer, on } from '@ngrx/store';
import * as BoardsActions from '../../actions/boards/boards.actions';
import { ResponseModel } from '../../../models/response.model';
import { BoardModel } from '../../../models/boards/board.model';


export const BoardFetureKey = 'Board';

export interface BoardState {
    listboards: ResponseModel<BoardModel> | undefined;
    board: ResponseModel<BoardModel> | undefined;
    createBoarResponse: BoardModel | undefined;
}

export const initialBoardState: BoardState = {
  listboards: undefined,
  board: undefined,
  createBoarResponse: undefined,
};

export const BoardReducer = createReducer(
  initialBoardState,
    on(BoardsActions.clearStoreFlags, (state: BoardState) => ({
        ...state,
        listboards: undefined,
        board: undefined,
        createBoarResponse: undefined,
    })),

    // Get All Boards
    on(BoardsActions.loadBoards, (state: BoardState) => ({
        ...state,
        listboards: undefined
    })),
    on(BoardsActions.loadBoardSuccess, (state: BoardState, { response }) => ({
        ...state,
        listboards: response
    })),
    on(BoardsActions.loadBoardsFail, (state: BoardState) => ({
        ...state,
        listboards: undefined
    })),

    // Create Board
    on(BoardsActions.createBoard, (state: BoardState) => ({
        ...state,
        createBoarResponse: undefined
    })),
    on(BoardsActions.createBoardSsuccess, (state: BoardState, { response }) => ({
        ...state,
        createBoarResponse: response
    })),
    on(BoardsActions.createBoardFail, (state: BoardState) => ({
        ...state,
        createBoarResponse: undefined
    })),

    // Load Boar by Id
    on(BoardsActions.loadBoard, (state: BoardState) => ({
        ...state,
        board: undefined
    })),
    on(BoardsActions.loadBoardSuccess, (state: BoardState, { response }) => ({
        ...state,
        board: response
    })),
    on(BoardsActions.loadBoardFail, (state: BoardState) => ({
        ...state,
        board: undefined
    })),
);

export function BoardReducerFunc(
    state: BoardState | undefined,
    action: Action
): any {
    return BoardReducerFunc(state, action);
}

