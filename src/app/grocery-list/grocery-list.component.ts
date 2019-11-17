import { Component, OnInit } from '@angular/core';

import { ingredient } from '../../types/ingredient';
import { groceryItem } from '../../types/groceryItem';
import { GroceryItemsService } from '../grocery-items.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  items:ingredient[];
  completeItems:ingredient[];
  incompleteItems:ingredient[];

  constructor(
    private _groceryServ: GroceryItemsService,
  ) { }

  ngOnInit() {
    this.items = this._groceryServ.getItems();
    this.getFilteredItems();
  }

  getFilteredItems() {
    this.completeItems = this._groceryServ.getCompleteItems();
    this.incompleteItems = this._groceryServ.getIncompleteItems();
  }

  onToggle(item:groceryItem) {
    // toggle an item complete or incomplete
    // should talk to the service for this!
    this._groceryServ.updateItem(item, "isDone", !item.isDone);
    this.getFilteredItems();
  }

  completedStyle(item:groceryItem){
    if(item.isDone){
      return "done-strike";
    }
    return "";
  }

  removeItem(item:groceryItem){
    this.items = this._groceryServ.removeItem(item);
    this.getFilteredItems();
  }
}