import { Injectable } from "@angular/core";
import { IMessage } from "./interfaces/IMessage";
import { MessageType } from "./enums/MessageType";
import { BehaviorSubject, filter, last, mergeMap, Observable, tap, timer } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);

  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();
  
  private addMessage(text: string, type: MessageType): void {
    const message: IMessage = {
      id: Date.now(),
      text,
      type
    }
    const messageList: IMessage[] = this.messagesSubject.getValue();
    this.messagesSubject.next([message, ...messageList]);
    setTimeout(() => this.closeMessage(message), 5000);
  }

  closeMessage(message: IMessage): void {
    const messageList: IMessage[] = this.messagesSubject.getValue();
    const updatedMessageList: IMessage[] = messageList.filter(m => m.id !== message.id);
    this.messagesSubject.next(updatedMessageList);
  }

  getMessages(): Observable<IMessage[]> {
    return this.messages$;
  }

  showSuccessMessage(content: string): void {
    this.addMessage(content, MessageType.SUCCESS);
  }

  showInfoMessage(content: string): void {
    this.addMessage(content, MessageType.INFO);
  }

  showWarningMessage(content: string): void {
    this.addMessage(content, MessageType.WARN);
  }

  showErrorMessage(content: string): void {
    this.addMessage(content, MessageType.ERROR);
  }
}