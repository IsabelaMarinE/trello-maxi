import { combineReducers } from '@ngrx/store';

//Reducers
import { BoardReducer } from './reducers/boards/board.reducer';
import { ColumnReducer } from './reducers/columns/column.reducer';
import { TaskReducer } from './reducers/tasks/task.reducer';

//States
import { BoardState } from './reducers/boards/board.reducer';
import { ColumnState } from './reducers/columns/column.reducer';
import { TaskState } from './reducers/tasks/task.reducer';

export const StoreFeatureKey = 'Store';

export type StoreState = {
  boardStore: BoardState,
  columnStore: ColumnState,
  taskStore: TaskState
};

export const StoreReducer = combineReducers<StoreState>({
  boardStore: BoardReducer,
  columnStore: ColumnReducer,
  taskStore: TaskReducer
});
