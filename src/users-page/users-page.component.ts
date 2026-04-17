import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { UserCardComponent } from "../user-card/user-card.component";
import { CreateUserComponent } from "../create-user/create-user.component";
import { UsersFilterComponent } from "../users-filter/users-filter.component";

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  
  private userService: UserService = inject(UserService);
  private filterUsersSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  
  filteredUsers$:  Observable<IUser[]> = combineLatest([
    this.userService.users$,
    this.filterUsersSubject
    ]).pipe(
      map(([users, filter]: [IUser[], string]) =>
        users.filter((user: IUser) =>
          user.name.toLowerCase().includes(filter.toLowerCase() || '')
        )
      )
  );

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.loadUsers()
      .pipe(
        tap((user: IUser[]) => this.userService.setUsers(user))
      ).subscribe();
  }

  requestUsers() {
    this.userService.fetchUsers()
      .pipe(
        tap((user: IUser[]) => this.userService.setUsers(user))
      ).subscribe();
  }

  onDeleteUser(user: IUser): void {
    this.userService.deleteUser(user.id);
  }
  
  onCreateUser(user: IUser): void {
    this.userService.addUser(user);
  }
  
  onFilterChange(value: string): void {
    this.filterUsersSubject.next(value);
  }

}
