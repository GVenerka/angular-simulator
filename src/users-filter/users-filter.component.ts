import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, delay, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {

  @Output() onFilterUsers: EventEmitter<string | null> = new EventEmitter;
  filteringInput: FormControl<string | null> = new FormControl('');
  private destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.filteringInput.valueChanges.pipe(
      delay(200),
      distinctUntilChanged(),
      tap((event: string | null) => {
        this.onFilterUsers.emit(event);
        takeUntilDestroyed(this.destroyRef);
      })
      ).subscribe();
  }
  
}
