import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

import { routes } from './app.routes';
import { Preset } from '@primeuix/themes/types';
import { Theme } from '../enums/Theme';

function getTheme(): Preset {
  const primeTheme = localStorage.getItem('primeTheme');

  if (!primeTheme) {
    return Aura;
  }

  const theme = JSON.parse(primeTheme);

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
    providePrimeNG({
      theme: {
        preset: getTheme(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    })
  ]
};
