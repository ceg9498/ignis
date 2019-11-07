import { Component, OnInit } from '@angular/core';

import { GroceryItemsService } from '../grocery-items.service';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css']
})
export class GroceryListComponent implements OnInit {
  items;

  constructor(
    private groceryService: GroceryItemsService,
  ) { }

  ngOnInit() {
    this.items = this.groceryService.getItems();
  }

  onToggleCheck() {
    // toggle an item complete or incomplete
    // should talk to the service for this!
  }
}