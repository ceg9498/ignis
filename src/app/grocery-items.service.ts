import { Injectable } from '@angular/core';
import { GenerateIDService } from './generate-id.service';
import { IndexedDBService } from './indexed-db.service';

@Injectable()
export class GroceryItemsService {
  items = [];
  constructor(
    private _id: GenerateIDService,
    private _idbServ: IndexedDBService,
  ) { }

  init() {
    this._idbServ.getData("ignis", "groceries").subscribe(
      (result) => {
        this.addItem(result);
      },
      (err) => {
        console.error(err);
      }
    )
  }

  addItem(item){
    if(!item.id){
      item.id = this._id.generate();
    }
    if(item.isDone === undefined || item.isDone === null){
      item.isDone = false;
    }
    this.items.push({...item});
  }

  getItems(){
    return this.items;
  }

  getCompletedItems(){
    return this.items.filter((item)=>item.isDone);
  }

  getIncompleteItems(){
    return this.items.filter((item)=>!item.isDone);
  }

  removeItem(item){
    this.items.forEach((curItem,index) => {
      if(curItem.id === item.id){
        this.items.splice(index, 1);
      }
    });
    return this.items;
  }

  updateItem(item, property, value){
    this.items.forEach((curItem,index) => {
      if(curItem.id === item.id){
        this.items[index][property] = value;
      }
    });
    return this.items;
  }

  clearList(){
    this.items = [];
    return this.items;
  }
}