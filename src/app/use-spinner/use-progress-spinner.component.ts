import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ProgressSpinnerDialogComponent } from '../spinner/progressSpinnerDialog.component';

@Component({
  selector: 'app-use-progress-spinner-component',
  templateUrl: './use-progress-spinner.component.html',
})
export class UseProgressSpinnerComponent implements OnInit {
  constructor(private dialog: MatDialog) {
    const observable = new Observable(this.myObservable);
    this.showProgressSpinnerUntilExecuted(observable);
  }

  ngOnInit() {}

  myObservable(observer) {
    setTimeout(() => {
      observer.next('done waiting for 3 sec');
      observer.complete();
    }, 3000);
  }

  showProgressSpinnerUntilExecuted(observable: Observable<Object>) {
    const dialogRef: MatDialogRef<ProgressSpinnerDialogComponent> = this.dialog.open(
      ProgressSpinnerDialogComponent,
      {
        panelClass: 'transparent',
        disableClose: true,
      }
    );
    const subscription = observable.subscribe(
      (response: any) => {
        subscription.unsubscribe();
        // handle response
        console.log(response);
        dialogRef.close();
      },
      (error) => {
        subscription.unsubscribe();
        // handle error
        dialogRef.close();
      }
    );
  }
}
