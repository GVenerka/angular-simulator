import { Component } from '@angular/core';
import './training.js';
import { Color } from '../enums/Color.js';
import { Collection } from './сollection.js';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  constructor() {
    this.saveLastVisitDate();
    this.updateVisitCount();
    this.colors.addItem('red');
    this.colors.replaceItem(0, 'yellow');
    this.colors.getAllItems();
    this.numbers.addItem(7);
    this.numbers.addItem(5);
    this.numbers.clearAll();
  }

  companyName: string = 'румтибет';
  colors: Collection<string> = new Collection<string>();
  numbers: Collection<number> = new Collection<number>();

  isPrimaryColor(color: Color): boolean {
    return Object.values(Color).includes(color);
  }

  saveLastVisitDate(): void {
    const currentDate: string = new Date().toISOString();
    localStorage.setItem('last-visit', currentDate);
  }

  updateVisitCount(): void {
    let visits: number = Number(localStorage.getItem('visit-count')) || 0;
    visits = visits + 1;
    localStorage.setItem('visit-count', visits.toString());
  }

}