import { Injectable } from '@angular/core';
import { GenerateIDService } from './generate-id.service';

@Injectable()
export class GroceryItemsService {
  items = [];
  constructor(
    private _id: GenerateIDService,
  ) { }

  addItem(item){
    item.id = this._id.generate();
    console.log(item.id);
    item.isDone = false;
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