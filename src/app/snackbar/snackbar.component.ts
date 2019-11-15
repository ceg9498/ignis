import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroceryListComponent } from '../grocery-list/grocery-list.component';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  @Input() snackBar: {
    message: string,
    action?: {
      label: string,
      fn: Function
    },
    duration?: number
  };

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  open():void {
    let ref = this._snackBar.open(
      this.snackBar.message, 
      this.snackBar.action.label, 
      {
        duration: this.snackBar.duration,

      });

    ref.onAction().subscribe(
      () => {
        this.snackBar.action.fn();
      }
    );
  }
  /*
  open() {
    this._snackBar.openFromComponent(
      GroceryListComponent,
      {
        duration: 5000,
      }
    );
  }
  */

}
