import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// 1. Feature selector for the whole auth state
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// 2. Selector for the user object
export const getUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

// 3. Selector for token (if you store it)
export const getToken = createSelector(
  selectAuthState,
  (state: AuthState) => (state.user?.token)
);

// 4. Selector for auth loading state (if you have it)
export const getAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

// 5. Selector for error (if you have it)
export const getAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
