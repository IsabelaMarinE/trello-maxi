import { Action, createReducer, on } from '@ngrx/store';
import * as ColumnActions from '../../actions/columns/columns.actions';
import { ResponseModel } from '../../../models/response.model';
import { ColumnModel } from '../../../models/columns/column.model';


export const ColumnFetureKey = 'Column';

export interface ColumnState {
  createColumnResponse: ResponseModel<ColumnModel[]> | undefined;
  allColumns: ResponseModel<ColumnModel[]> | undefined;
}

export const initialColumnState: ColumnState = {
  createColumnResponse: undefined,
  allColumns: undefined,
};

export const ColumnReducer = createReducer(
  initialColumnState,
    on(ColumnActions.clearStoreFlags, (state: ColumnState) => ({
        ...state,
        createColumnResponse: undefined,
        allColumns: undefined,
    })),

    // Create Column
    on(ColumnActions.createColumn, (state: ColumnState) => ({
        ...state,
        createColumnResponse: undefined
    })),
    on(ColumnActions.createColumnSuccess, (state: ColumnState, { response }) => ({
        ...state,
        createColumnResponse: response
    })),
    on(ColumnActions.createColumnFail, (state: ColumnState) => ({
        ...state,
        createColumnResponse: undefined
    })),

    // Get All Column
    on(ColumnActions.getAllColumns, (state: ColumnState) => ({
      ...state,
      allColumns: undefined
  })),
  on(ColumnActions.getAllColumnsSuccess, (state: ColumnState, { response }) => ({
      ...state,
      allColumns: response
  })),
  on(ColumnActions.getAllColumnsFail, (state: ColumnState) => ({
      ...state,
      allColumns: undefined
  })),

);

export function ColumnReducerFunc(
    state: ColumnState | undefined,
    action: Action
): any {
    return ColumnReducerFunc(state, action);
}

