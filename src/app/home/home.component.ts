import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../schedule.service';
import { GroceryItemsService } from '../grocery-items.service';
import { groceryItem } from 'src/types/groceryItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  today = null;
  groceries:groceryItem[];

  constructor(
    private _scheduleServ: ScheduleService,
    private _groceryServ: GroceryItemsService,
  ) { }

  ngOnInit() {
    this.today = this._scheduleServ.getToday();
    this.groceries = this._groceryServ.getItems();
  }

}