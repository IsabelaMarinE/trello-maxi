import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromTaskStore from '../../store.reducer';

export const selectTaskStoreState =
  createFeatureSelector<fromTaskStore.StoreState>(
    fromTaskStore.StoreFeatureKey
  );

export const createTaskResponse = createSelector(
  selectTaskStoreState,
  (state: fromTaskStore.StoreState) =>
    state.taskStore.createTaskResponse
);

export const updateTaskResponse = createSelector(
  selectTaskStoreState,
  (state: fromTaskStore.StoreState) =>
    state.taskStore.updateTask
);

export const getTaskResponse = createSelector(
  selectTaskStoreState,
  (state: fromTaskStore.StoreState) =>
    state.taskStore.loadTask
)
