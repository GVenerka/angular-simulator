import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() filteringUser: EventEmitter<string | null> = new EventEmitter;
  filteringInput: FormControl<string | null> = new FormControl('');

  ngOnInit(): void {
    this.filteringInput.valueChanges.pipe(
      tap((event: string | null) => {
        this.filteringUser.emit(event);
      })
      ).subscribe();
  }
}
