import { Component, inject, OnInit } from '@angular/core';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../theme.service';
import { AsyncPipe } from '@angular/common';
import { Theme } from '../enums/Theme';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, FormsModule, ToggleSwitch, ToggleSwitchModule, FontAwesomeModule, SelectButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  companyName: string = 'румтибет';
  widget: 'date' | 'counter' = 'date';
  currentDate: string = new Date().toLocaleString();
  count: number = 0;
  selectedNavigationId: number = 2;
  themeService: ThemeService = inject(ThemeService);
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  themes = [
    { label: 'Aura', value: Theme.AURA },
    { label: 'Lara', value: Theme.LARA },
    { label: 'Nora', value: Theme.NORA }
  ];
  navigations: INavigation[] = [
    {
      name: 'Главная',
      id: 1,
      text: 'main-list',
    },
    {
      name: 'Пользователи',
      id: 2,
      text: 'users',
    },
  ];
  
  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date().toLocaleString();
    }, 1000);
  }

  toggleDarkMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.applyDarkTheme(event.checked);
  }

  changeTheme(theme: Theme): void {
    this.themeService.changeTheme(theme);
  }

  increaseCounter(): void {
    this.count++;
  }
  
  reduceCounter(): void {
    this.count--;
  }
  
  changeWidget(widget: 'date' | 'counter'): void {
    if (widget === 'date') {
      this.widget = 'counter';
    } else {
      this.widget = 'date';
    }
  }
  
}
