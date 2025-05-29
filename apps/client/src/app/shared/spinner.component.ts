import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  template: `
    <div class="flex justify-center items-center w-full my-4">
      <div class="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
    </div>
  `
})
export class SpinnerComponent {}
