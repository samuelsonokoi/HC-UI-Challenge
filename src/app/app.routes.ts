import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'buy' },
  { path: 'buy', loadComponent: () => import('./pages/buy/buy.component').then(c => c.BuyComponent) },
  { path: '**', redirectTo: 'buy' },
];
