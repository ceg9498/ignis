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

  createId() {
    return this.recipes.length+1;
  }

  addItem(item) {
    // need to add an index
    // for now this will be the length of the array, 
    // but this will break as soon as items are deleted!
    if(!item.id){
      item.id = this.createId();
    }
    this.recipes.push(item);
  }

  addAndSaveItem(item) {
    this.addItem(item);
    this.saveItem(item);
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

  getRecipeById(id:string|number) {
    return this._idbServ.getById("ignis", "recipes", id);
  }
}