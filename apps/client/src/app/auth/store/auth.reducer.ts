import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { LoginResponse } from '../auth.models';

export interface AuthState {
  user: LoginResponse | null;
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
  })),
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    loading: false,
    error,
  })),
);
