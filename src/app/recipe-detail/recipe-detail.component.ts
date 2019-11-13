import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { RecipesService } from '../recipes.service';
import { GroceryItemsService } from '../grocery-items.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe;
  recipeId;
  ingredientPanelOpen = true;
  instructionPanelOpen = true;
  scheduleDate;
  isDateInvalid = false;
  
  constructor(
    private route: ActivatedRoute,
    private groceryService: GroceryItemsService,
    private scheduleService: ScheduleService,
    private recipeService: RecipesService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.recipeId = +params.get('recipeId');
      this.recipe = this.recipeService.getRecipeById(this.recipeId);
    });
  }

  addToGroceries(items) {
    items.forEach(item => {
      this.groceryService.addItem(item);
    })
  }

  schedule(event: MatDatepickerInputEvent<Date>){
    this.scheduleDate = event.value;
  }
  submitDate(){
    // call the schedule service to add it to the list
    if(!this.scheduleDate){
      // display an error for the user
      this.isDateInvalid = true;
    } else {
      this.isDateInvalid = false;
      this.scheduleService.addAndSaveMeal(this.scheduleDate, this.recipe);
    }
  }
}