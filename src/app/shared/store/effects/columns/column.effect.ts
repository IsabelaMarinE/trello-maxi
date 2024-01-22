import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import * as ColumnActions from '../../actions/columns/columns.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LocalHostService } from '../../../services/localhost.service';



@Injectable()
export class ColumnEffects {
    createColumn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColumnActions.createColumn),
            switchMap((action) =>
                from(this.service.createColumn(action.request)).pipe(
                    map((response) => {
                        return ColumnActions.createColumnSuccess({ response })
                    }),
                    catchError(() => {
                        return of(ColumnActions.createColumnFail());
                    })
                )
            )
        )
    )
    getAllColumn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ColumnActions.getAllColumns),
            switchMap((action) =>
                from(this.service.getAllColumns(action.id_board)).pipe(
                    map((response) => {
                        return ColumnActions.getAllColumnsSuccess({ response })
                    }),
                    catchError(() => {
                        return of(ColumnActions.getAllColumnsFail());
                    })
                )
            )
        )
    )
    constructor(
        private actions$: Actions,
        private service: LocalHostService
    ) {

    }
}

