import { Action } from '@ngrx/store';
import { UserActions, UserActionTypes } from './count.actions';

export const userFeatureKey = 'usersState';

export interface State {
  users: any,
  error: string
}

export const initialState: State = {
  users: [],
  error: ''
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {

    case UserActionTypes.LoadUsers:
      return {
        ...state
      }

      case UserActionTypes.DragMarker:
        return {
          ...state
        } 
      case UserActionTypes.BuildMap:
          return {
            ...state
          } 
    default:
      return state;
  }
}
