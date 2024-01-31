import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import * as TaskActions from '../../actions/tasks/task.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LocalHostService } from '../../../services/localhost.service';



@Injectable()
export class TaskEffects {
    createTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.createTask),
            switchMap((action) =>
                from(this.service.createTask(action.request)).pipe(
                    map((response) => {
                        return TaskActions.createTaskSuccess({ response })
                    }),
                    catchError(() => {
                        return of(TaskActions.createTaskFail());
                    })
                )
            )
        )
    )
    gettask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.loadTask),
            switchMap((action) =>
                from(this.service.getTaskById(action.id)).pipe(
                    map((response) => {
                        return TaskActions.loadTaskSuccess({ response })
                    }),
                    catchError(() => {
                        return of(TaskActions.loadTaskFail());
                    })
                )
            )
        )
    )

    updatedtask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TaskActions.updateTask),
            switchMap((action) =>
                from(this.service.updatedTaskBy(action.request)).pipe(
                    map((response) => {
                        return TaskActions.updateTaskSuccess({ response })
                    }),
                    catchError(() => {
                        return of(TaskActions.updateTaskFail());
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
