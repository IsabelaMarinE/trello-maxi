import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromColumnStore from '../../store.reducer';

export const selectColumnStoreState =
  createFeatureSelector<fromColumnStore.StoreState>(
    fromColumnStore.StoreFeatureKey
  );

export const createColumnResponse = createSelector(
  selectColumnStoreState,
  (state: fromColumnStore.StoreState) =>
    state.columnStore.createColumnResponse
);
