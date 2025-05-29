import { createAction, props } from '@ngrx/store';
import { User } from '../auth.models';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const register = createAction('[Auth] Register', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: User }>());
export const authFailure = createAction('[Auth] Failure', props<{ error: string }>());
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);