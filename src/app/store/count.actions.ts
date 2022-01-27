import { Action } from '@ngrx/store';

export enum UserActionTypes {
    LoadUsers = '[User] Load Users',
    DragMarker = '[Markers] Drag Markers',
    BuildMap = '[Map] Build Map'
  }

export class LoadUsers implements Action {
    readonly type = UserActionTypes.LoadUsers;
  }

export class DragMarker implements Action {
    readonly type = UserActionTypes.DragMarker;
  }

export class BuildMap implements Action {
  readonly type = UserActionTypes.BuildMap;
}

export type UserActions = LoadUsers | DragMarker | BuildMap;
