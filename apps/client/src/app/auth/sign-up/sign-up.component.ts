import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup, FormControl
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { InputComponent } from '../../shared/input.component';
import { UI_TEXTS } from '../../shared/constants';
import { register } from '../store/auth.actions';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        [formGroup]="signUpForm"
        (ngSubmit)="onSubmit()"
        class="w-full max-w-sm bg-white p-8 rounded-xl shadow-md space-y-6"
        autocomplete="off"
      >
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">{{ ui.title }}</h2>

        <app-input
          [label]="ui.emailLabel"
          type="email"
          [placeholder]="ui.emailPlaceholder"
          [control]="emailControl"
          id="email"
        >
          {{ ui.errors.emailRequired }}
        </app-input>

        <app-input
          [label]="ui.passwordLabel"
          type="password"
          [placeholder]="ui.passwordPlaceholder"
          [control]="passwordControl"
          id="password"
        >
          {{ ui.errors.passwordRequired }}
        </app-input>

        <app-input
          [label]="ui.confirmPasswordLabel"
          type="password"
          [placeholder]="ui.confirmPasswordPlaceholder"
          [control]="confirmPasswordControl"
          id="confirmPassword"
        >
      <span *ngIf="signUpForm.hasError('mismatch') && isConfirmPasswordControlTouched()">
        {{ ui.errors.mismatch }}
      </span>
          <span *ngIf="confirmPasswordControl?.hasError('required') && isConfirmPasswordControlTouched()">
        {{ ui.errors.confirmPasswordRequired }}
      </span>
        </app-input>

        <button
          type="submit"
          [disabled]="signUpForm.invalid"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ ui.submit }}
        </button>
      </form>
    </div>

  `,
  styles: [``],
})
export class SignUpComponent {
  ui = UI_TEXTS.auth.signUp;

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


  get emailControl(): FormControl {
    return this.signUpForm.get('email') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.signUpForm.get('password') as FormControl;
  }
  get confirmPasswordControl(): FormControl {
    return this.signUpForm.get('confirmPassword') as FormControl;
  }

  isConfirmPasswordControlTouched = () =>{
    (this.confirmPasswordControl as any)?.touched
  }


  onSubmit() {
    debugger
    if (this.signUpForm.valid) {
      const { email, password } = this.signUpForm.value;
      // TODO: Dispatch register action (NgRx)
      this.store.dispatch(register({ email, password }));
    }
  }

  private passwordsMatch(formGroup: any) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

}
