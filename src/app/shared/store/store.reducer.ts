import { combineReducers } from '@ngrx/store';

//Reducers
import { BoardReducer } from './reducers/boards/board.reducer';

//States
import { BoardState } from './reducers/boards/board.reducer';

export const StoreFeatureKey = 'Store';

export type StoreState = {
  boardStore: BoardState
};

export const StoreReducer = combineReducers<StoreState>({
  boardStore: BoardReducer
});
