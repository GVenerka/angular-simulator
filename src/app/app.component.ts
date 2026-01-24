import { Component } from '@angular/core';
import './training.js';
import { RGBColor } from '../enums/Color.js';
import { Collection } from './Collection.js';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'румтибет';

  isPrimaryColor(color: string): boolean {
    return color === RGBColor.RED || color === RGBColor.GREEN || color === RGBColor.BLUE? true : false 
  }

  saveLastVisitDate(): void {
    const currentDate: string = new Date().toISOString();
    localStorage.setItem('last-visit', currentDate);
  }

  updateVisitCount(): void {
    let visits: number = Number(localStorage.getItem('visit-count')) || 0;
    visits = visits +1;
    localStorage.setItem('visit-count', visits.toString());
  }

  constructor() {
    this.saveLastVisitDate();
    this.updateVisitCount();
  }

}

const colors: Collection<string> = new Collection<string>();
colors.addItem('red');
colors.replaceItem(0, 'yellow');
colors.getAllItems();

const numbers: Collection<number> = new Collection<number>();
numbers.addItem(7);
numbers.addItem(5);
numbers.clearAll();