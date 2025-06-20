import { createAction, props } from '@ngrx/store';
import { LoginResponse, User } from '../auth.models';

export const register = createAction('[Auth] Register', props<{ email: string; password: string }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: LoginResponse }>());
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);