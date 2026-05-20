import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhoneFormatPipe } from '../pipes/phone-format.pipe';
import { PhoneFormat } from '../enums/PhoneFormat';
import { HoverBoldDirective } from '../directive/hover-bold.directive';
import { GradientBorderDirective } from '../directive/gradient-border.directive';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneFormatPipe, HoverBoldDirective, GradientBorderDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  PhoneFormat: typeof PhoneFormat = PhoneFormat;

  onDeleteUser(event: IUser): void {
    this.deleteUser.emit(event);
  }
}
