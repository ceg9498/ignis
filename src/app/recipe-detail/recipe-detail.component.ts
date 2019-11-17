import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { recipe, Recipe } from '../../types/recipe';
import { RecipesService } from '../recipes.service';
import { GroceryItemsService } from '../grocery-items.service';
import { ScheduleService } from '../schedule.service';
import { ingredient } from 'src/types/ingredient';
import { GroceryItem } from 'src/types/groceryItem';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:recipe;
  recipeId:number|string;
  ingredientPanelOpen:boolean = true;
  instructionPanelOpen:boolean = true;
  scheduleDate:Date;
  isDateInvalid:boolean = false;
  
  constructor(
    private _route: ActivatedRoute,
    private _groceryServ: GroceryItemsService,
    private _scheduleServ: ScheduleService,
    private _recipeServ: RecipesService,
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe( params => {
      this.recipeId = +params.get('recipeId');
      this._recipeServ.getRecipeById(this.recipeId).subscribe(
        (result) => {
          this.recipe = new Recipe(result.id, result.name, result.ingredients, result.instructions);
        },
        (err) => {
          console.error(err);
        }
      );
    });
  }

  addToGroceries(items:ingredient[]):void {
    items.forEach(item => {
      let toAdd = new GroceryItem(item, null);
      this._groceryServ.addAndSaveItem(toAdd);
    })
  }

  schedule(event: MatDatepickerInputEvent<Date>):void{
    this.scheduleDate = event.value;
  }
  submitDate():void{
    // call the schedule service to add it to the list
    if(!this.scheduleDate){
      // display an error for the user
      this.isDateInvalid = true;
    } else {
      this.isDateInvalid = false;
      console.log(this.recipe);
      this._scheduleServ.addAndSaveMeal(this.scheduleDate, this.recipe);
    }
  }
}