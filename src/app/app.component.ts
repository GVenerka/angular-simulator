import { Component, inject } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { Collection } from './сollection';
import { IProgram } from '../interfaces/IProgram';
import { FormsModule } from '@angular/forms';
import { ILocation } from '../interfaces/ILocation';
import { IParticipant } from '../interfaces/IParticipant';
import { IDestination } from '../interfaces/IDestination';
import { IPost } from '../interfaces/IPost';
import { MessageService } from '../message.service';
import { MessageType } from '../enums/MessageType';
import { NgTemplateOutlet } from '@angular/common';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {

  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  
  companyName: string = 'румтибет';
  private colors: Collection<string> = new Collection<string>();
  private numbers: Collection<number> = new Collection<number>();
  widget: 'date' | 'counter' = 'date';
  currentDate: string = new Date().toLocaleString();
  count: number = 0;
  inputText!: string;
  isLoading: boolean = true;
  chooseLocation: string = 'tour-location';
  chooseDate!: string;
  chooseParticipant: string = 'participant';
  inputType: 'text' | 'date' = 'text';

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
      value: 'iremel',
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

  destinations: IDestination[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480,
      rating: 4.9,
      poster: 'lake-near-mountains',
    },
    {
      id: 2,
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500,
      rating: 4.5,
      poster: 'night-in-mountains',
    },
    {
      id: 3,
      title: 'Растяжка в горах',
      description: 'для тех, кто заботится о себе',
      price: 230,
      rating: 5.0,
      poster: 'stretching-in-mountains',
    },
  ];

  posts: IPost[] = [
    {
      id: 1,
      title: 'Красивая Италя, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      poster: 'italy',
      postDate: '01/04/2023',
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      poster: 'down-with-assumptions',
      postDate: '01/04/2023',
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.',
      poster: 'traveling-alone',
      postDate: '01/04/2023',
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      poster: 'india',
      postDate: '01/04/2023',
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
      this.currentDate = new Date().toLocaleString();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
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

  addSuccessMessage(): void {
    this.messageService.addMessage('Данные получены', MessageType.SUCCESS);
  }

  addInfoMessage(): void {
    this.messageService.addMessage('Ваш запрос отправлен, ожидайте ответа', MessageType.INFO);
  }

  addWarningMessage(): void {
    this.messageService.addMessage('Данные загружаются, пожалуйста, подождите', MessageType.WARN);
  }

  addErrorMessage(): void {
    this.messageService.addMessage('Извините, сервис временно не доступен', MessageType.ERROR);
  }

}