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
    this.recipeService.getAll().subscribe({
      next(result) {
        if(this.recipes === undefined){
          this.recipes = [];
        }
        this.recipes.push(result);
        console.log(this.recipes);
      },
      error(err) { console.error(err) },
      complete() { console.log("Recipe Init Complete!",this.recipes); }
    });
  }
}