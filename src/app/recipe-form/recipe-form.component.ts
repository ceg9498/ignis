import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RecipesService } from '../recipes.service';
import { ingredient } from 'src/types/ingredient';
import { Recipe, recipe } from 'src/types/recipe';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  @Input() recipe = null;
  pageTitle:string;
  ingredients:ingredient[];
  editIng:boolean[];
  ingredientEdit;
  instructions:string[];
  editIns:boolean[];
  instructionEdit;
  recipeName:FormControl;

  constructor(
    private _recipeServ: RecipesService,
  ) { }

  ngOnInit() {
    this.editIng = [];
    this.editIns = [];
    if(this.recipe){
      this.pageTitle = "Editing";
      this.recipeName = new FormControl(this.recipe.name);
      this.ingredients = this.recipe.ingredients || [];
      for(let i = 0; i < this.recipe.ingredients.length; i++) {
        this.editIng.push(false);
      }
      this.instructions = this.recipe.instructions || [];
      for(let i = 0; i < this.recipe.instructions.length; i++) {
        this.editIns.push(false);
      }
    } else {
      this.pageTitle = "New Recipe";
      this.recipeName = new FormControl('');
      this.ingredients = [];
      this.instructions = [];
    }
  }

  addIngredient(data:ingredient):void {
    this.ingredients.push(data);
    this.editIng.push(false);
  }

  addInstruction(data:string):void {
    this.instructions.push(data);
    this.editIns.push(false);
  }

  addRecipe():void {
    if(this.pageTitle.match(/^Editing.*/)) {
      this._recipeServ.updateItem(
        new Recipe(
          this.recipe.id, 
          this.recipeName.value, 
          [...this.ingredients], 
          [...this.instructions]
        )
      );
    } else {
      this._recipeServ.addAndSaveItem(
        new Recipe(
          null, 
          this.recipeName.value, 
          [...this.ingredients], 
          [...this.instructions]
        )
      );
    }
  }

  editIngredient(index:number):void {
    this.editIng[index] = true;
  }

  updateIngredient(index:number, data:ingredient):void {
    this.ingredients[index] = data;
    this.editIng[index] = false;
  }

  deleteIngredient(index:number):void {
    this.ingredients.splice(index, 1);
  }

  editInstruction(index:number):void {
    this.editIns[index] = true;
  }

  updateInstruction(index:number, data:string):void {
    this.instructions[index] = data;
    this.editIns[index] = false;
  }

  deleteInstruction(index:number):void {
    this.instructions.splice(index, 1);
  }
}