import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="w-full max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 class="text-3xl font-bold text-blue-700 mb-6 text-center">Dashboard</h1>
      <div class="text-lg text-gray-600 text-center">
        Welcome to your AI Investment Assistant dashboard!
      </div>
      <!-- Add dashboard widgets, stats, charts, etc. here -->
      <div class="mt-8 text-center">
        <span class="inline-block rounded-lg bg-blue-100 text-blue-800 px-4 py-2 font-medium">
          🚀 More features coming soon...
        </span>
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardComponent {}
