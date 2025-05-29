import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="input-wrapper">
      <label [for]="id" class="input-label">{{ label }}</label>
      <input
        [type]="type"
        [formControl]="formControl"
        [id]="id"
        [placeholder]="placeholder"
        class="input-field"
      />
      <div *ngIf="formControl?.invalid && (formControl?.dirty || isTouched())" class="input-error">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
      .input-wrapper {
          margin-bottom: 16px;
      }
      .input-label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
      }
      .input-field {
          width: 100%;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #d0d0d0;
          transition: border-color 0.2s;
      }
      .input-field:invalid {
          border-color: #f44336;
      }
      .input-field:focus {
          outline: none;
          border-color: #0a6cff;
          box-shadow: 0 0 0 2px #a0c5f8;
      }
      .input-error {
          color: #f44336;
          font-size: 12px;
          margin-top: 4px;
      }
  `]
})
export class InputComponent {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() formControl!: FormControl;
  @Input() id: string = '';


  isTouched = () =>{
    (this.formControl as any)?.touched
  }
}
