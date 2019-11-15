import { Component, OnInit } from '@angular/core';

import { RecipesService } from '../recipes.service';
import { recipe } from 'src/types/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:recipe[] = [];

  constructor(
    private _recipeServ: RecipesService,
  ) { }

  ngOnInit() {
    this.recipes = this._recipeServ.getAll();
  }
}