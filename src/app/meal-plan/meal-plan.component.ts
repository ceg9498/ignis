import { Component, OnInit } from '@angular/core';

import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {
  schedule = [];

  constructor(
    private scheduleService: ScheduleService,
  ) { }

  ngOnInit() {
    this.schedule = this.scheduleService.getMeals();
  }
}