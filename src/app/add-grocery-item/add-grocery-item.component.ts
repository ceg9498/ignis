import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-grocery-item',
  templateUrl: './add-grocery-item.component.html',
  styleUrls: ['./add-grocery-item.component.scss']
})
export class AddGroceryItemComponent {
  @Output() addItem = new EventEmitter();

  constructor() { }

  send(item){
    this.addItem.emit(item);
  }
}
