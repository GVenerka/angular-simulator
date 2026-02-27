import { Injectable } from "@angular/core";
import { IMessage } from "./interfaces/IMessage";
import { MessageType } from "./enums/MessageType";

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  private messages: IMessage[] = [];
  
  private addMessage(text: string, type: MessageType): void {
    const message: IMessage = {
      id: Date.now(),
      text,
      type
    }
    this.messages = [message, ...this.messages];
    setTimeout(() => this.closeMessage(message.id), 5000);
  }

  closeMessage(id: number): void {
    this.messages = this.messages.filter((message: IMessage) => message.id !== id);
  }

  getMessages(): IMessage[] {
    return this.messages;
  }

  addSuccessMessage(content: string): void {
    this.addMessage(content, MessageType.SUCCESS);
  }

  addInfoMessage(content: string): void {
    this.addMessage(content , MessageType.INFO);
  }

  addWarningMessage(content: string): void {
    this.addMessage(content, MessageType.WARN);
  }

  addErrorMessage(content: string): void {
    this.addMessage(content, MessageType.ERROR);
  }
}