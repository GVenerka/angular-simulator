import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.sevice';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from './interfaces/IUser';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    return this.usersApiService.getUsers()
      .pipe(
        catchError(() => { 
          this.messageService.showErrorMessage('Произошла ошибка, попробуйте повторить позднее');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader())
      );
  }
  
}
