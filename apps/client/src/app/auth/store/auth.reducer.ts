import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../shared/models';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  // When registration starts, set loading to true
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  // When registration succeeds, set loading to false
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  // When registration fails, set loading to false and save the error
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
