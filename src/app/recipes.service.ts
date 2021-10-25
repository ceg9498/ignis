import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IndexedDBService } from './indexed-db.service';

@Injectable()
export class RecipesService {
  recipes = [];

  constructor(
    private _idbServ: IndexedDBService,
  ) { }

  init() {
    this._idbServ.getData("ignis", "recipes").subscribe(
      (result) => {
        this.addItem(result);
      },
      (err) => { console.error(err) }
    );
  }

  saveItem(item) {
    this._idbServ.addOrUpdateOne("ignis", "recipes", item).subscribe({
      next(result) { console.log("DB Add Result:",result); },
      error(err) { console.error(err); }
    });
  }

  createId(str) {
    // hash the name of the recipe to be an id.
    let hash = 0;
    for(let i = 0; i < str.length; i++){
      let char = str.charCodeAt(i);
      hash = (hash * 7) + char;
    }
    return hash;
  }

  addItem(item) {
    // need to add a proper id
    // for now this will be the length of the array, 
    // but this will break as soon as items are deleted!
    if(!item.id){
      item.id = this.createId(item.name);
    }
    this.recipes.push(item);
  }

  addAndSaveItem(item) {
    this.addItem(item);
    this.saveItem(item);
  }

  updateItem(item) {
    if(!item.id){
      item.id = this.createId(item.name);
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

  getRecipeById(id:string|number) {
    return this._idbServ.getById("ignis", "recipes", id);
  }
}