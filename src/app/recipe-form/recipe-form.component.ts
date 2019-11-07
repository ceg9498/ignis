import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe = null;
  pageTitle;
  ingredients;
  ingredientEdit;
  instructions;
  instructionEdit;
  recipeName;

  constructor(
    private recipeService: RecipesService,
  ) { }

  ngOnInit() {
    if(this.recipe){
      this.pageTitle = "Editing";
      this.recipeName = new FormControl(this.recipe.name);
      this.ingredients = this.recipe.ingredients;
      this.instructions = this.recipe.instructions;
    } else {
      this.pageTitle = "New Recipe";
      this.recipeName = new FormControl('');
      this.ingredients = [];
      this.instructions = [];
    }
    this.ingredientEdit = null;
    this.instructionEdit = null;
  }

  addIngredient(data) {
    this.ingredients.push(data);
  }

  addInstruction(data) {
    this.instructions.push(data);
  }

  addRecipe() {
    let nRecipe = {
      id: this.recipe ? this.recipe.id : null,
      name: this.recipeName.value,
      ingredients: [...this.ingredients],
      instructions: [...this.instructions]
    };

    if(this.pageTitle === "Editing") {
      this.recipeService.updateItem(nRecipe);
    } else {
      this.recipeService.addItem(nRecipe);
    }
  }

  editIngredient(index) {
    this.ingredientEdit = this.ingredients[index];
  }

  deleteIngredient(index) {
    this.ingredients.splice(index, 1);
  }

  editInstruction(index) {
    // for editing, need to add the ability to send data to the child
  }

  deleteInstruction(index) {
    this.instructions.splice(index, 1);
  }
}