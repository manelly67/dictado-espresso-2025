// app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';

export const APP_ROUTES: Routes = [
  { path: '', component: Home },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.About),
  },
];
