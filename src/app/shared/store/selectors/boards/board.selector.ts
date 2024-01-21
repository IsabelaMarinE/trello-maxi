import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromBoardStore from '../../store.reducer';

export const selectBoardStoreState =
  createFeatureSelector<fromBoardStore.StoreState>(
    fromBoardStore.StoreFeatureKey
  );

export const selectListBoards= createSelector(
  selectBoardStoreState,
  (state: fromBoardStore.StoreState) =>
    state.boardStore.listboards
);

export const createBoardResponse = createSelector(
  selectBoardStoreState,
  (state: fromBoardStore.StoreState) =>
    state.boardStore.createBoarResponse
);

export const loadBoardById = createSelector(
  selectBoardStoreState,
  (state: fromBoardStore.StoreState) =>
    state.boardStore.board
);
