import { Injectable } from '@angular/core';

@Injectable()
export class GroceryItemsService {
  items = [];
  constructor() { }

  addItem(item){
    // this is not working
    // when adding new items that match existing items,
    // the old IDs end up matching the new IDs?
    item.id = this.items.length+1;
    item.isDone = false;
    this.items.push(item);
    console.log("Items:",this.items);
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