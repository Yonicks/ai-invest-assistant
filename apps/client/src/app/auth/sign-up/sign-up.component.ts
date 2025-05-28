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
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
      [formGroup]="signUpForm"
      (ngSubmit)="onSubmit()"
      style="max-width: 400px; margin: 2rem auto;"
    >
      <h2>Sign Up</h2>
      <label style="display:block; margin-bottom:8px;">
        Email:
        <input formControlName="email" type="email" style="width:100%;" />
      </label>
      <div
        *ngIf="
          signUpForm.get('email')?.invalid && signUpForm.get('email')?.touched
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
          signUpForm.get('password')?.invalid &&
          signUpForm.get('password')?.touched
        "
        style="color:red; font-size:12px;"
      >
        Password is required.
      </div>
      <label style="display:block; margin-bottom:8px;">
        Confirm Password:
        <input
          formControlName="confirmPassword"
          type="password"
          style="width:100%;"
        />
      </label>
      <div
        *ngIf="
          signUpForm.hasError('mismatch') &&
          signUpForm.get('confirmPassword')?.touched
        "
        style="color:red; font-size:12px;"
      >
        Passwords do not match.
      </div>
      <button
        type="submit"
        [disabled]="signUpForm.invalid"
        style="margin-top:12px; width:100%;"
      >
        Sign Up
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
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch }
    );
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      // TODO: Dispatch register action (NgRx)
      this.store.dispatch({ type: '[Auth] Register', email, password });
    }
  }

  private passwordsMatch(formGroup: any) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
