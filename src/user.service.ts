import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.sevice';
import { BehaviorSubject, catchError, combineLatest, finalize, map, Observable, of } from 'rxjs';
import { IUser } from './interfaces/IUser';
import { MessageService } from './message.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private storage: LocalStorageService = inject(LocalStorageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  private filterUsers$ = new BehaviorSubject<string | null>('');

  setUsers(user: IUser[]): void {
    this.usersSubject.next(user);
    this.storage.setItem('users', user);
  }

  addUser(user: IUser): void {
    const users: IUser[] = this.getUsers();
    const newUsers: IUser[] = [...users, user];
    this.setUsers(newUsers);
    this.storage.setItem('users', newUsers);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();
    const usersOnStorage: IUser[] | null = this.storage.getItem('users');
    if (usersOnStorage) {
      this.setUsers(usersOnStorage);
    }
    return this.usersApiService.getUsers()
      .pipe(
        catchError(() => { 
          this.messageService.showErrorMessage('Произошла ошибка, попробуйте повторить позднее');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader())
      );
  }

  deleteUser(id: number): void {
    const users: IUser[] = this.getUsers().filter(user => user.id !== id);
    this.setUsers(users);
    this.storage.setItem('users', users);
  }

  filteredUsers$ = combineLatest([
    this.users$,
    this.filterUsers$
  ]).pipe(
    map(([users, filter]) =>
      users.filter(user =>
        user.name.includes(filter || '')
      )
    )
  );

  filterUsers(value: string | null): void {
    this.filterUsers$.next(value);
  }
  
}
