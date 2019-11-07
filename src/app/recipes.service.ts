import { Injectable } from '@angular/core';

import { recipes } from './recipes';

@Injectable()
export class RecipesService {
  recipes = [];

  constructor() {
    this.recipes = [...recipes];
  }

  createId() {
    return this.recipes.length+1;
  }

  addItem(item) {
    // need to add an index
    // for now this will be the length of the array, 
    // but this will break as soon as items are deleted!
    item.id = this.createId();

    console.log("adding", item.id, item.name)
    this.recipes.push(item);
  }

  updateItem(item) {
    if(!item.id){
      item.id = this.createId();
    }
    console.log("updating", item.id, item.name)
    this.recipes.forEach((recipe, index) => {
      if(recipe.id === item.id){
        this.recipes[index] = item;
      }
    });
  }

  getAll() {
    return this.recipes;
  }

  getRecipeById(id) {
    let temp =  this.recipes.filter((recipe) => recipe.id === id)[0];
    return temp;
  }
}