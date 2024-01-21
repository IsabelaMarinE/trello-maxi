import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import * as BoardActions from '../../actions/boards/boards.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LocalHostService } from '../../../services/localhost.service';



@Injectable()
export class BoardEffects {
  getBoards$ = createEffect(() =>
  this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      switchMap(() =>
          from(this.service.loadBoards()).pipe(
              map((response) => {
                  return BoardActions.loadBoardsSuccess({ response })
              }),
              catchError(() => {
                  return of(BoardActions.loadBoardsFail());
              })
          )
      )

    )
  )
  getBoardById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoardActions.loadBoard),
            switchMap((action) =>
                from(this.service.loadBoardById(action.id)).pipe(
                    map((response) => {
                        return BoardActions.loadBoardSuccess({ response })
                    }),
                    catchError(() => {
                        return of(BoardActions.loadBoardFail());
                    })
                )
            )
        )
    )

    createBoard$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BoardActions.createBoard),
            switchMap((action) =>
                from(this.service.addNewboard(action.request)).pipe(
                    map((response) => {
                        return BoardActions.createBoardSsuccess({ response })
                    }),
                    catchError(() => {
                        return of(BoardActions.createBoardFail());
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

