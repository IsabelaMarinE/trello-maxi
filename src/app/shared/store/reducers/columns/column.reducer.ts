import { Action, createReducer, on } from '@ngrx/store';
import * as ColumnActions from '../../actions/columns/columns.actions';
import { ResponseModel } from '../../../models/response.model';
import { ColumnModel } from '../../../models/columns/column.model';


export const ColumnFetureKey = 'Column';

export interface ColumnState {
  createColumnResponse: ResponseModel<ColumnModel> | undefined;
}

export const initialColumnState: ColumnState = {
  createColumnResponse: undefined,
};

export const ColumnReducer = createReducer(
  initialColumnState,
    on(ColumnActions.clearStoreFlags, (state: ColumnState) => ({
        ...state,
        createColumnResponse: undefined,
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

);

export function ColumnReducerFunc(
    state: ColumnState | undefined,
    action: Action
): any {
    return ColumnReducerFunc(state, action);
}

