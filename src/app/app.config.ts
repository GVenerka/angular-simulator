import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enums/Theme';
import { ITheme } from '../interfaces/ITheme';
import { errorInterceptor } from '../interceptors/error.interceptor';
import { loggingInterceptor } from '../interceptors/logging.interceptor';

function getTheme(): Preset {
  const primeTheme: string | null = localStorage.getItem('primeTheme');

  if (!primeTheme) {
    return Aura;
  }

  const theme: Theme = JSON.parse(primeTheme);

  const themes: Record<string, Preset> = {
    [Theme.AURA]: Aura,
    [Theme.LARA]: Lara,
    [Theme.NORA]: Nora,
  };

  if (themes[theme]) {
    return themes[theme];
  }

  return Aura;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: getTheme(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    }),
    provideHttpClient(withInterceptors([errorInterceptor, loggingInterceptor]))
  ]
};
