import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    // Or loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.routes)
  },
  { path: 'login', loadComponent: () => import('./auth/sign-in.component').then(m => m.SignInComponent) },
  { path: 'sign-up', loadComponent: () => import('./auth/sign-up.component').then(m => m.SignUpComponent) },
  // Add other public routes here
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
