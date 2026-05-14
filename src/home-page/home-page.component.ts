import { Component, inject } from '@angular/core';
import { IPost } from '../interfaces/IPost';
import { IDestination } from '../interfaces/IDestination';
import { IParticipant } from '../interfaces/IParticipant';
import { ILocation } from '../interfaces/ILocation';
import { IProgram } from '../interfaces/IProgram';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faCirclePlay, faStar, faPersonHiking, faShield, faTag, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);

  faAngleDown: IconDefinition = faAngleDown;
  faCalendar: IconDefinition = faCalendar;
  faPlay: IconDefinition = faCirclePlay;
  faStar: IconDefinition = faStar;
  faPersonHiking: IconDefinition = faPersonHiking;
  faShield: IconDefinition = faShield;
  faTag: IconDefinition = faTag;
  inputText!: string;
  chooseLocation: string = 'tour-location';
  chooseDate!: string;
  chooseParticipant: string = 'participant';
  inputType: 'text' | 'date' = 'text';

  programs: IProgram[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: this.faPersonHiking,
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: this.faShield,
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: this.faTag,
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
      date: '01/04/2023',
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      poster: 'down-with-assumptions',
      date: '01/04/2023',
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.',
      poster: 'traveling-alone',
      date: '01/04/2023',
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      poster: 'india',
      date: '01/04/2023',
    },
  ];

  photos: string[] = ['air-balloons', 'camping-equipment', 'burj-al-arab', 'beach', 'canyon', 'travel-diary'];

}
