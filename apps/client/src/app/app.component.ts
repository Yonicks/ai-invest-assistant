import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <!-- Header -->
      <header class="bg-white shadow flex items-center h-16 px-8">
        <span class="font-bold text-2xl text-blue-700 tracking-tight">
          AI Invest Assistant
        </span>
        <!-- (Optional) Add navigation here in the future -->
      </header>

      <!-- Main content -->
      <main class="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <router-outlet></router-outlet>
      </main>

      <!-- (Optional) Footer -->
      <!--
      <footer class="bg-white border-t py-2 text-sm text-gray-400 text-center">
        &copy; {{ year }} AI Invest Assistant
      </footer>
      -->
    </div>
  `,
  styles: [``],
})
export class AppComponent {
  year = new Date().getFullYear();
}
