// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { provideNgIconsConfig } from '@ng-icons/core';
import { APP_ROUTES } from './app/app.routes';

bootstrapApplication(App, {
  providers: [provideRouter(APP_ROUTES),provideNgIconsConfig({
    size: '1.5em',
  }),],
});
