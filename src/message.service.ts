import { Injectable } from "@angular/core";
import { IMessage } from "./interfaces/IMessage";
import { MessageType } from "./enums/MessageType";

@Injectable()
export class MessageService {
  
  private messages: IMessage[] = [];
  private nextId: number = 1;

  addMessage(text: string, type: MessageType): void {
    const message: IMessage = {
      id: this.nextId++,
      text,
      type
    }
    this.messages.unshift(message);
    setTimeout(() => this.closeMessage(message.id), 5000);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter(message => message.id !== id);
  }

  getMessages(): IMessage[] {
    return this.messages;
  }

}