import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { InvestmentUploadComponent } from './features/investment-upload/investment-upload.component';

export const appRoutes: Routes = [
  // Public routes
  { path: 'login', loadComponent: () => import('./auth/sign-in.component').then(m => m.SignInComponent) },
  { path: 'sign-up', loadComponent: () => import('./auth/sign-up.component').then(m => m.SignUpComponent) },

  // Protected routes
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'investing/upload',
    canActivate: [authGuard],
    component: InvestmentUploadComponent
  },

  // Catch-all (redirect to dashboard)
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
