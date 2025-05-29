import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service'; // Update path as needed
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducer';
import { loginSuccess } from './store/auth.actions';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="max-w-sm mx-auto mt-16 bg-white shadow-lg rounded-xl p-8 space-y-6"
    >
      <h2 class="text-xl font-bold mb-4 text-center text-blue-700">Sign In</h2>
      <div>
        <label class="block mb-1">Email</label>
        <input
          type="email"
          formControlName="email"
          class="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label class="block mb-1">Password</label>
        <input
          type="password"
          formControlName="password"
          class="w-full border rounded px-3 py-2"
        />
      </div>
      <div *ngIf="error" class="text-red-500 text-center">{{ error }}</div>
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        [disabled]="form.invalid"
      >
        Login
      </button>
    </form>
  `,
})
export class SignInComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
    this.store.subscribe((state) => {
      console.log('Store changed!', state);
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe({
      next: (user) => {
        this.store.dispatch(loginSuccess({ user }));
        this.error = null;
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.error = err.error?.error || 'Login failed';
      },
    });
  }
}
