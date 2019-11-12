import { Component, OnInit } from '@angular/core';

import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes = [];

  constructor(
    private recipeService: RecipesService,
  ) { }

  ngOnInit() {
    this.recipes = this.recipeService.getAll();
  }
}