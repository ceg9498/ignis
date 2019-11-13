import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../schedule.service';
import { GroceryItemsService } from '../grocery-items.service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {
  schedule = [];

  constructor(
    private scheduleService: ScheduleService,
    private _groceryServ: GroceryItemsService,
  ) { }

  ngOnInit() {
    this.schedule = this.scheduleService.getMeals();
  }

  addToGroceries(items) {
    items.forEach(item => {
      this._groceryServ.addAndSaveItem(item);
    })
  }
}