import { Component, OnInit } from '@angular/core';

import { GroceryItemsService } from '../grocery-items.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private deleteNotice: MatSnackBar,
  ) { }

  ngOnInit() {
    this.items = this.groceryService.getItems();
    this.getFilteredItems();
  }

  getFilteredItems() {
    this.completeItems = this.groceryService.getCompleteItems();
    this.incompleteItems = this.groceryService.getIncompleteItems();
  }

  onToggle(item) {
    // toggle an item complete or incomplete
    // should talk to the service for this!
    this.items = this.groceryService.updateItem(item, "isDone", !item.isDone);
    this.getFilteredItems();
  }

  removeItem(item){
    this.items = this.groceryService.removeItem(item);
    this.getFilteredItems();

    this.showDeleteNotice(item);
  }

  completedStyle(item){
    if(item.isDone){
      return "done-strike";
    }
    return "";
  }
  showDeleteNotice(item) {
    let displayName = item.name[0].toUpperCase() + item.name.slice(1, item.name.length);

    let deletedItemRef = this.deleteNotice.open(
      displayName + " has been deleted.",
      "undo", 
      {
        duration: 10000
      }
    );
    deletedItemRef.onAction().subscribe(()=>{
      this.items.push(item);
      if(item.isDone){
        this.completeItems.push(item);
      } else {
        this.incompleteItems.push(item);
      }
    })
  }
}