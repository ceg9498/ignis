import { Injectable } from '@angular/core';

@Injectable()
export class GroceryItemsService {
  items = [];
  constructor() { }

  addItem(item){
    item.isDone = false;
    this.items.push(item);
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
      if(curItem.name === item.name){
        if(curItem.quantity.amount === item.quantity.amount &&
          curItem.quantity.unit === item.quantity.unit){
            this.items.splice(index, 1);
        }
      }
    });
    return this.items;
  }

  updateItem(item, property, value){
    this.items.forEach((curItem,index) => {
      if(curItem.name === item.name){
        if(curItem.quantity.amount === item.quantity.amount &&
          curItem.quantity.unit === item.quantity.unit){
            this.items[index][property] = value;
        }
      }
    });
    return this.items;
  }

  clearList(){
    this.items = [];
    return this.items;
  }
}