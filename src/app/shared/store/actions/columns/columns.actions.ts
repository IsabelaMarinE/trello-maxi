import { createAction, props } from '@ngrx/store';
import { ResponseModel } from '../../../models/response.model';
import { ColumnModel } from '../../../models/columns/column.model';


export const clearStoreFlags = createAction('[Column] Clear Store Flags');

export const clearColumn = createAction('[Column] Clear Column');

// Create Column
export const createColumn = createAction(
    '[Column] Create Column',
    props<{ request: ColumnModel }>()
)

export const createColumnSuccess = createAction(
    '[Column] Create Column Success',
    props<{ response: ResponseModel<ColumnModel> }>()
)

export const createColumnFail = createAction(
    '[Column] Create Column Fail'
)
