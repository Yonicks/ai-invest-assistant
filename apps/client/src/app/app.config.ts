import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { AuthEffects } from './auth/store/auth.effects';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './auth/store/auth.reducer';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({ auth: authReducer }),      // <-- Register reducer here
    provideEffects([AuthEffects]),            // <-- Register effects here
  ],
};
