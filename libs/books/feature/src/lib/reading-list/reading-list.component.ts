import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  confirmedRemoveFromReadingList,
  getReadingList,
  removeFromReadingList
} from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReadingListItem } from '@tmo/shared/models';
import { take } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private _snackBar: MatSnackBar
  ) { }

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));

    this.store.select(confirmedRemoveFromReadingList)
      .pipe(
        take(1)
      )
      .subscribe(b => {
        const mySnackBar = this._snackBar.open(`${item.title} removed from reading list`, 'Undo');
        mySnackBar.afterDismissed().subscribe(info => {
          if (info.dismissedByAction === true) {
            this.store.dispatch(addToReadingList({ book: { id: item.bookId, ...item } }));
          }
        });
      });
  }
}
