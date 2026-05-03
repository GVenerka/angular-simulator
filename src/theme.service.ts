import { inject, Injectable } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Theme } from './enums/Theme';
import { Preset } from '@primeuix/themes/types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  primeng: PrimeNG = inject(PrimeNG);

  private isDarkThemeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.initDarkMode());
  isDark$ :Observable<boolean> = this.isDarkThemeSubject.asObservable().pipe(
    tap((isDark: boolean) => {
      const element: HTMLHtmlElement = document.querySelector('html')!;
    isDark? element.classList.add('my-app-dark'): element.classList.remove('my-app-dark');
    })
  );

  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.initPrimeTheme())
  theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor() {
    const savedTheme = this.initPrimeTheme();
    this.changeTheme(savedTheme);
  }

  private initDarkMode(): boolean {
    return this.localStorageService.getItem('isDark') ?? false;
  }

  applyDarkTheme(isDark: boolean): void {
    this.isDarkThemeSubject.next(isDark);
    this.localStorageService.setItem('isDark', isDark);
  }

  private initPrimeTheme(): Theme {
    return this.localStorageService.getItem('primeTheme') as Theme ?? Theme.AURA;
  }

  changeTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.localStorageService.setItem('primeTheme', theme);

    this.primeng.theme.set({
      preset: this.getPreset(theme)
    });
  }

  private getPreset(theme: Theme): Preset {
    switch (theme) {
      case Theme.LARA:
        return Lara;
      case Theme.NORA:
        return Nora;
      case Theme.AURA:
      default:
        return Aura;
    }
  }

}
