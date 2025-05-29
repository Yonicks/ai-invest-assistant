import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AuthState } from './store/auth.reducer';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject<Store<{ auth: AuthState }>>(Store);
  const router = inject(Router);
  return store.select((s) => s.auth.user).pipe(
    take(1),
    map((user) => {
      if (user) {
        return true; // User is logged in
      }
      // Not logged in: redirect to /login
      router.navigate(['/login']);
      return false;
    })
  );
};
