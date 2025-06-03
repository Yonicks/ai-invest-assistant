import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './auth/store/auth.reducer';
import { loginSuccess } from './auth/store/auth.actions';
import { LoginResponse } from './auth/auth.models';
import { NgIf } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { select } from '@ngrx/store';
import { getUser } from './auth/store/auth.selectors';
import { ACCESS_TOKEN_AND_USER_DATA } from './shared/constants'; // Adjust the path if needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, AsyncPipe],
  template: `
    <header class="bg-white shadow flex items-center h-16 px-8 justify-between">
  <span class="font-bold text-2xl text-blue-700 tracking-tight">
    AI Invest Assistant
  </span>
      <nav class="flex items-center gap-4">
        <ng-container *ngIf="user$ | async as user; else guestLinks">
          <!-- Upload link (only visible if signed in) -->
          <a
            routerLink="/investing/upload"
            routerLinkActive="font-bold underline text-blue-700"
            class="px-3 py-1 rounded hover:bg-blue-50 text-blue-700 text-sm font-semibold transition"
          >
            Portfolio Upload
          </a>
          <span class="text-blue-900 font-medium">{{ user?.user?.email }}</span>
          <button
            class="ml-2 px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-700 text-sm font-semibold transition"
            (click)="signOut()"
          >
            Sign Out
          </button>
        </ng-container>
        <ng-template #guestLinks>
          <button
            class="px-3 py-1 rounded text-white bg-blue-600 hover:bg-blue-700 text-sm font-semibold transition"
            routerLink="/sign-up"
          >
            Sign Up
          </button>
          <button
            class="px-3 py-1 rounded text-blue-700 border border-blue-600 hover:bg-blue-50 text-sm font-semibold transition"
            routerLink="/sign-in"
          >
            Sign In
          </button>
        </ng-template>
      </nav>
    </header>
    <!-- Main content -->
    <main class="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [``],
})
export class AppComponent {
  year = new Date().getFullYear();
  user$: Observable<any>;

  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    // Restore user from localStorage
    const user:LoginResponse = JSON.parse(<string>localStorage.getItem(ACCESS_TOKEN_AND_USER_DATA));
    if (user?.token) {
      this.store.dispatch(loginSuccess({ user }));
      this.router.navigateByUrl('/');
    }

    this.user$ = this.store.pipe(select(getUser));
  }

  signOut() {
    // Remove token and user info from localStorage
    localStorage.removeItem(ACCESS_TOKEN_AND_USER_DATA); // If you store user data separately

    // Optionally clear other app data/state as needed

    // Dispatch logout or loginSuccess({ user: null })
    // @ts-ignore
    this.store.dispatch(loginSuccess({ user: null }));

    // Redirect to login or sign-in route
    this.router.navigate(['/login']); // or '/sign-in' if that's your route
  }
}
