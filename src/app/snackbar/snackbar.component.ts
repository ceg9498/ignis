import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroceryListComponent } from '../grocery-list/grocery-list.component';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  open() {
    this._snackBar.openFromComponent(
      GroceryListComponent,
      {
        duration: 5000,
      }
    );
  }

}
