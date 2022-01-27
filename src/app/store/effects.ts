import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as userActions from './count.actions';
import { MapService } from '../map.service';
import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: MapService) { }

  // @Effect()
  // loadUsers$: any = this.actions$.pipe(
  //   ofType(userActions.UserActionTypes.LoadUsers),
  //   switchMap(async ({ payload }) => this.userService.searchGeo()),
  //   );


     @Effect()
     loadUsers$ = this.actions$.pipe(
    ofType(userActions.UserActionTypes.LoadUsers),
    mergeMap((): any => {
      this.userService.searchGeo();
      return [];
    })
    );


    @Effect()
  markersDrag$: any = this.actions$.pipe(
    ofType(userActions.UserActionTypes.DragMarker),
    mergeMap((): any => {
      this.userService.dragMarker();
      return [];
    })
    );

    @Effect()
    buildMap$: any = this.actions$.pipe(
    ofType(userActions.UserActionTypes.BuildMap),
    mergeMap((): any => {
      this.userService.buildMap();
      return [];
    })
    );

}
