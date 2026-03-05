import { Component } from '@angular/core';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  companyName: string = 'румтибет';
  widget: 'date' | 'counter' = 'date';
  currentDate: string = new Date().toLocaleString();
  count: number = 0;
  selectedNavigationId: number = 2;

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
  
  constructor() {
    setInterval(() => {
      this.currentDate = new Date().toLocaleString();
    }, 1000);
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
