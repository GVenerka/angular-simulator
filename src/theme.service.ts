import { inject, Injectable } from '@angular/core';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Theme } from './enums/Theme';
import { Preset } from '@primeuix/themes/types';
import { ITheme } from './interfaces/ITheme';
import { usePreset } from '@primeuix/themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private isDarkThemeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.initDarkMode());
  isDark$: Observable<boolean> = this.isDarkThemeSubject.asObservable().pipe(
    tap((isDark: boolean) => {
      const element: HTMLHtmlElement = document.querySelector('html')!;
    isDark ? element.classList.add('my-app-dark') : element.classList.remove('my-app-dark');
    })
  );

  private themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.initPrimeTheme())
  theme$: Observable<Theme> = this.themeSubject.asObservable();

  themes: ITheme[] = [
    { label: 'Aura', value: Theme.AURA },
    { label: 'Lara', value: Theme.LARA },
    { label: 'Nora', value: Theme.NORA }
  ];

  constructor() {
    this.changeTheme(this.themeSubject.value);
  }

  private initDarkMode(): boolean {
    return this.localStorageService.getItem('isDark') ?? false;
  }

  toggleDarkMode(isDark: boolean): void {
    this.isDarkThemeSubject.next(isDark);
    this.localStorageService.setItem('isDark', isDark);
  }

  private initPrimeTheme(): Theme {
    return this.localStorageService.getItem('primeTheme') as Theme ?? Theme.AURA;
  }

  changeTheme(theme: Theme): void {
    const themes: Record<Theme, Preset> = {
      [Theme.AURA]: Aura,
      [Theme.LARA]: Lara,
      [Theme.NORA]: Nora,
    }
    const preset: Preset = themes[theme];
    usePreset(preset);
    this.localStorageService.setItem('primeTheme', theme);
  }

}
