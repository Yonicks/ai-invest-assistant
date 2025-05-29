import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service'; // Service for API calls
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../auth.models';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
    console.log('actions$', this.actions$);

  }

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ email, password }) =>
        this.authService.register(email, password).pipe(
          map((user: User) => AuthActions.registerSuccess({ user })),
          catchError(error => of(AuthActions.registerFailure({ error: error.message || 'Unknown error' })))
        )
      )
    )
  );
}

