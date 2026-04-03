import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.sevice';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from './interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersApi: UserApiService = inject(UserApiService);
  loader: LoaderService = inject(LoaderService);

  private users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.users.asObservable();

  setUsers(user: IUser[]): void {
    this.users.next(user);
  }

  getUsers(): Observable<IUser[]> {
    return this.users$;
  }

  loadUsers(): Observable<IUser[]> {
    this.loader.showLoader();

    return this.usersApi.getUsers().pipe(
      tap((user: IUser[]) => this.setUsers(user)),
      catchError(() => of([])),
      finalize(() => this.loader.hideLoader())
    );
  }
  
}
