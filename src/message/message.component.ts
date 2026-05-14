import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faCircleXmark, IconDefinition } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe, FontAwesomeModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);
  faEnvelope: IconDefinition = faEnvelope;
  faCircleXmark: IconDefinition = faCircleXmark;
  
}
