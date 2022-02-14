import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';

import {
  map,
  switchMap,
  mergeMap,
  catchError,
} from 'rxjs/operators';

import { TasksService } from './../services/tasks.service';
import * as Action from './task.actions';

@Injectable()
export class TaskEffects {
  constructor(private api: TasksService, private actions$: Actions) { }

  @Effect()
  loadAction$ = this.actions$.pipe(
    ofType<Action.LoadAction>(Action.TaskActionTypes.LOAD),
    switchMap(payload =>
      this.api.load().pipe(
        map(res => new Action.LoadActionSuccess({ tasks: res })),
        catchError(error => this.handleError(error)))
    ));

  @Effect()
  createAction$ = this.actions$.pipe(
    ofType<Action.CreateAction>(Action.TaskActionTypes.CREATE),
    map(action => action.payload),
    mergeMap(payload =>
      this.api.create(payload.task).pipe(
        map(res => new Action.CreateActionSuccess({ task: res })),
        catchError(error => this.handleError(error)))
    ));

  @Effect()
  updateAction$ = this.actions$
    .ofType<Action.UpdateAction>(Action.TaskActionTypes.UPDATE)
    .map(action => action.payload)
    .mergeMap(payload =>
      this.api.update(payload.task).pipe(
        map(res => new Action.UpdateActionSuccess({ task: res })),
        catchError(error => this.handleError(error)))
    );

  @Effect()
  removeAction$ = this.actions$
    .ofType<Action.RemoveAction>(Action.TaskActionTypes.REMOVE)
    .map(action => action.payload)
    .mergeMap(payload =>
      this.api.remove(payload.id).pipe(
        map(res => new Action.RemoveActionSuccess({ id: res })),
        catchError(error => this.handleError(error)))
    );

  private handleError(error) {
    return of(new Action.ErrorAction(error));
  }
}
