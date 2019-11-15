import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RecipesService } from '../recipes.service';
import { ingredient } from 'src/types/ingredient';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe = null;
  pageTitle:string;
  ingredients:ingredient[];
  ingredientEdit;
  instructions:string[];
  instructionEdit;
  recipeName:FormControl;

  constructor(
    private _recipeServ: RecipesService,
  ) { }

  ngOnInit() {
    if(this.recipe){
      this.pageTitle = "Editing";
      this.recipeName = new FormControl(this.recipe.name);
      this.ingredients = this.recipe.ingredients || [];
      this.instructions = this.recipe.instructions || [];
    } else {
      this.pageTitle = "New Recipe";
      this.recipeName = new FormControl('');
      this.ingredients = [];
      this.instructions = [];
    }
    this.ingredientEdit = null;
    this.instructionEdit = null;
  }

  addIngredient(data:ingredient):void {
    this.ingredients.push(data);
  }

  addInstruction(data:string):void {
    this.instructions.push(data);
  }

  addRecipe():void {
    let nRecipe = {
      id: this.recipe ? this.recipe.id : null,
      name: this.recipeName.value,
      ingredients: [...this.ingredients],
      instructions: [...this.instructions]
    };

    if(this.pageTitle === "Editing") {
      this._recipeServ.updateItem(nRecipe);
    } else {
      this._recipeServ.addAndSaveItem(nRecipe);
    }
  }

  editIngredient(index:number):void {
    this.ingredientEdit = this.ingredients[index];
  }

  deleteIngredient(index:number):void {
    this.ingredients.splice(index, 1);
  }

  editInstruction(index:number):void {
    // for editing, need to add the ability to send data to the child
  }

  deleteInstruction(index:number):void {
    this.instructions.splice(index, 1);
  }
}