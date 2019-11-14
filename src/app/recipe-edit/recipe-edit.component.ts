import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe;

  constructor(
    private _route: ActivatedRoute,
    private _recipeServ: RecipesService,
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe( params => {
      this.recipe = this._recipeServ.getRecipeById(+params.get('recipeId'));
    });
  }

}