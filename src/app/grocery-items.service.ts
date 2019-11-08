import { Injectable } from '@angular/core';

@Injectable()
export class GroceryItemsService {
  items = [];
  constructor() { }

  addItem(item){
    this.items.push(item);
  }

  getItems(){
    return this.items;
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

  updateItem(item, updateValue){

  }

  clearList(){
    this.items = [];
    return this.items;
  }
}