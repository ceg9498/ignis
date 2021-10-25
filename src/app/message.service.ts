import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  open(message:string, actionLabel:string, actionFunction:Function, duration:number):void {
    let ref = this._snackBar.open(
      message, 
      actionLabel, 
      {
        duration: duration,

      });

    ref.onAction().subscribe(
      () => {
        actionFunction();
      }
    );
  }

  openPlain(message:string, duration?:number):void {
    this._snackBar.open(message, null, { duration: duration });
  }
}
