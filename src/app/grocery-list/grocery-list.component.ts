import { Component, OnInit } from '@angular/core';

import { ingredient, Ingredient } from '../../types/ingredient';
import { groceryItem, GroceryItem } from '../../types/groceryItem';
import { GroceryItemsService } from '../grocery-items.service';

interface items {
  complete: groceryItem[],
  incomplete: groceryItem[],
};

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  items:items;

  constructor(
    private _groceryServ: GroceryItemsService,
  ) { }

  ngOnInit() {
    this.items = this._groceryServ.getItems();
  }

  onToggle(item:groceryItem) {
    // toggle an item complete or incomplete
    // should talk to the service for this!
    this.items = this._groceryServ.updateItem(item, "isDone", !item.isDone);
  }

  completedStyle(item:groceryItem){
    if(item.isDone){
      return "done-strike";
    }
    return "";
  }

  addItem(item:ingredient){
    let gItem = new GroceryItem(item, false);
    console.log("adding grocery item")
    this._groceryServ.addAndSaveItem(gItem);
  }

  removeItem(item:groceryItem){
    this.items = this._groceryServ.removeItem(item);
  }
}