import { Component, inject } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { Collection } from './сollection';
import { LocalStorageService } from '../local-storage.service';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { MessageComponent } from "../message/message.component";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, FooterComponent, MessageComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  
  private colors: Collection<string> = new Collection<string>();
  private numbers: Collection<number> = new Collection<number>();
  
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

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }

  private saveLastVisitDate(): void {
    const currentDate: string = new Date().toISOString();
    this.localStorageService.setItem('last-visit', currentDate);
  }

  private updateVisitCount(): void {
    let visits: number = Number(this.localStorageService.getItem('visit-count')) || 0;
    visits = visits + 1;
    this.localStorageService.setItem('visit-count', visits.toString());
  }

}