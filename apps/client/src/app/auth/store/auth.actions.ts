import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const register = createAction('[Auth] Register', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ user: any }>());
export const authFailure = createAction('[Auth] Failure', props<{ error: any }>());
