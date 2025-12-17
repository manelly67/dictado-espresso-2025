// app.routes.ts
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { HomePT } from './home-pt/home-pt';
import { DictPT } from './dict-pt/dict-pt';
import { DictES } from './dict-es/dict-es';

import { About } from './about/about';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'pt',
    loadComponent: () => import('./home-pt/home-pt').then((m) => m.HomePT),
  },

  {
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.About),
  },
  {
    path: 'dictadoEs/:categ',
    loadComponent: () => import('./dict-es/dict-es').then((m) => m.DictES),
  },
  {
    path: 'dictadoPt/:categ',
    loadComponent: () => import('./dict-pt/dict-pt').then((m) => m.DictPT),
  },
];
