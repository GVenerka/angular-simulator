import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { Collection } from './сollection';
import { IProgram } from '../interfaces/IProgram';
import { FormsModule } from '@angular/forms';
import { ILocation } from '../interfaces/ILocation';
import { IParticipant } from '../interfaces/IParticipant';

@Component({
  selector: 'app-root',
  imports: [ FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  companyName: string = 'румтибет';
  private colors: Collection<string> = new Collection<string>();
  private numbers: Collection<number> = new Collection<number>();
  isShowDate: boolean = true;
  currentDate: string = new Date().toLocaleString();
  count: number = 0;
  inputText: string = '';
  isLoading: boolean = true;
  chooseLocation: string = 'tour-location';
  chooseDate: string = '';
  chooseParticipant: string = 'participant';
  inputType: string = 'text';

  programs: IProgram[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'guides-icon',
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'safety-icon',
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'price-icon',
    },
  ];

  locations: ILocation[] = [
    {
      id: 1,
      name: 'гора Иремель',
      value: 'iremel'
    },
    {
      id: 2,
      name: 'Инзерские зубчатки',
      value: 'inzer',
    },
    {
      id: 3,
      name: 'Айгирские скалы',
      value: 'aigir',
    },
    {
      id: 4,
      name: 'пещера Шульганташ',
      value: 'shulgantash',
    },
    {
      id: 5,
      name: 'хребет Зюраткуль',
      value: 'zyuratkul',
    },
  ];

  participants: IParticipant[] = [
    {
      id: 1,
      name: 'Мэйбл',
      value: 'mable',
    },
    {
      id: 2,
      name: 'Диппер',
      value: 'dipper',
    },
    {
      id: 3,
      name: 'Стэн',
      value: 'stan',
    },
    {
      id: 4,
      name: 'Зус',
      value: 'zoos',
    },
    {
      id: 5,
      name: 'Венди',
      value: 'vendy',
    },
  ];

  constructor() {
    this.saveLastVisitDate();
    this.updateVisitCount();
    this.colors.addItem('red');
    this.colors.replaceItem(0, 'yellow');
    this.colors.getAllItems();
    this.numbers.addItem(7);
    this.numbers.addItem(5);
    this.numbers.clearAll();

    setInterval(() => {
      this.showDate()
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  private showDate(): void {
    const date: Date = new Date();
    this.currentDate = date.toLocaleString();
  }

  increaseCounter(): void {
    this.count ++;
  }

  reduceCounter(): void {
    this.count --;
  }

  changeContent(): void {
    this.isShowDate = !this.isShowDate;
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return primaryColors.includes(color);
  }

  private saveLastVisitDate(): void {
    const currentDate: string = new Date().toISOString();
    localStorage.setItem('last-visit', currentDate);
  }

  private updateVisitCount(): void {
    let visits: number = Number(localStorage.getItem('visit-count')) || 0;
    visits = visits + 1;
    localStorage.setItem('visit-count', visits.toString());
  }

  onFocus() {
    this.inputType = 'date';
  }

  onBlur() {
    this.inputType = 'text';
  }

}