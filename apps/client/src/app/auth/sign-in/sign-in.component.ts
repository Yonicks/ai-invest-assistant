import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
      [formGroup]="signInForm"
      (ngSubmit)="onSubmit()"
      style="max-width: 400px; margin: 2rem auto;"
    >
      <h2>Sign In</h2>
      <label style="display:block; margin-bottom:8px;">
        Email:
        <input formControlName="email" type="email" style="width:100%;" />
      </label>
      <div
        *ngIf="
          signInForm.get('email')?.invalid && signInForm.get('email')?.touched
        "
        style="color:red; font-size:12px;"
      >
        Email is required and must be valid.
      </div>
      <label style="display:block; margin-bottom:8px;">
        Password:
        <input formControlName="password" type="password" style="width:100%;" />
      </label>
      <div
        *ngIf="
          signInForm.get('password')?.invalid &&
          signInForm.get('password')?.touched
        "
        style="color:red; font-size:12px;"
      >
        Password is required.
      </div>
      <button
        type="submit"
        [disabled]="signInForm.invalid"
        style="margin-top:12px; width:100%;"
      >
        Sign In
      </button>
    </form>
  `,
  styles: [
    `
      h2 {
        text-align: center;
        margin-bottom: 24px;
      }

      form {
        background: #f7f7f7;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
      }

      input {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #d0d0d0;
        margin-top: 4px;
      }

      button {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        background: #0a6cff;
        color: white;
        font-weight: bold;
        cursor: pointer;
      }

      button:disabled {
        background: #a0c5f8;
        cursor: not-allowed;
      }
    `,
  ],
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      // TODO: Dispatch login action (NgRx)
      this.store.dispatch({ type: '[Auth] Login', email, password });
    }
  }
}
