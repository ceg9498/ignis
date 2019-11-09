import { Component, OnInit } from '@angular/core';

import { GroceryItemsService } from '../grocery-items.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  items;
  completeItems;
  incompleteItems;

  constructor(
    private groceryService: GroceryItemsService,
  ) { }

  ngOnInit() {
    this.items = this.groceryService.getItems();
    this.completeItems = this.groceryService.getCompletedItems();
    this.incompleteItems = this.groceryService.getIncompleteItems();
  }

  onToggle(item) {
    // toggle an item complete or incomplete
    // should talk to the service for this!
    this.items = this.groceryService.updateItem(item, "isDone", !item.isDone);
    this.completeItems = this.groceryService.getCompletedItems();
    this.incompleteItems = this.groceryService.getIncompleteItems();
  }

  removeItem(item){
    this.items = this.groceryService.removeItem(item);
    this.completeItems = this.groceryService.getCompletedItems();
    this.incompleteItems = this.groceryService.getIncompleteItems();
  }

  completedStyle(item){
    if(item.isDone){
      return "done-strike";
    }
    return "";
  }
}