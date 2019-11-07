import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../schedule.service';
import { GroceryItemsService } from '../grocery-items.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  today = null;
  groceries;

  constructor(
    private scheduleServ: ScheduleService,
    private groceryServ: GroceryItemsService,
  ) { }

  ngOnInit() {
    this.today = this.scheduleServ.getToday();
    this.groceries = this.groceryServ.getItems();
  }

}