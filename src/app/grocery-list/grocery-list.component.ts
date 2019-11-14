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
    private _groceryServ: GroceryItemsService,
    private _deleteNotice: MatSnackBar,
  ) { }

  ngOnInit() {
    this.items = this._groceryServ.getItems();
    this.getFilteredItems();
  }

  getFilteredItems() {
    this.completeItems = this._groceryServ.getCompleteItems();
    this.incompleteItems = this._groceryServ.getIncompleteItems();
  }

  onToggle(item) {
    // toggle an item complete or incomplete
    // should talk to the service for this!
    this.items = this._groceryServ.updateItem(item, "isDone", !item.isDone);
    this.getFilteredItems();
  }

  removeItem(item){
    this.items = this._groceryServ.removeItem(item);
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

    let deletedItemRef = this._deleteNotice.open(
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