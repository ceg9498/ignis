import { Injectable } from '@angular/core';
import { GenerateIDService } from './generate-id.service';
import { IndexedDBService } from './indexed-db.service';

import { groceryItem } from '../types/groceryItem';
import { MessageService } from './message.service';

@Injectable()
export class GroceryItemsService {
  items:groceryItem[] = [];
  completeItems:groceryItem[] = [];
  incompleteItems:groceryItem[] = [];

  constructor(
    private _id: GenerateIDService,
    private _idbServ: IndexedDBService,
    private _deleteNotice: MessageService,
  ) { }

  init() {
    this._idbServ.getData("ignis", "groceries").subscribe(
      (result) => {
        this.addItem(result);
        if(result.isDone){
          this.completeItems.push(result);
        } else {
          this.incompleteItems.push(result);
        }
      },
      (err) => {
        console.error(err);
      }
    )
  }

  addAndSaveItem(item:groceryItem) {
    this.addItem(item);
    this.saveItem(item);
  }

  saveItem(item:groceryItem){
    console.log("saving", item.name);
    this._idbServ.addOrUpdateOne("ignis", "groceries", item).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  addItem(item:groceryItem){
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

  getIncompleteItems(){
    return this.incompleteItems;
  }

  getCompleteItems() {
    return this.completeItems;
  }

  removeItem(item:groceryItem){
    this._idbServ.deleteOne("ignis", "groceries", item.id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );

    if(item.isDone){
      this.completeItems.forEach((curItem,index) => {
        if(curItem.id === item.id){
          this.completeItems.splice(index, 1);
        }
      });
    } else {
      this.incompleteItems.forEach((curItem,index) => {
        if(curItem.id === item.id){
          this.incompleteItems.splice(index, 1);
        }
      });
    }
    this.showDeleteNotice(item);
    
    return this.items;
  }

  undelete(item:groceryItem){
    if(item.isDone){
      this.completeItems.push(item);
    } else {
      this.incompleteItems.push(item);
    }
    this._idbServ.addOrUpdateOne("ignis", "groceries", item).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.error(err);
      }
    );
  }

  showDeleteNotice(item:groceryItem) {
    let displayName = item.name[0].toUpperCase() + item.name.slice(1, item.name.length);

    this._deleteNotice.open(
      displayName + " has been deleted.",
      "undo",
      ()=> {this.undelete(item)},
      10000
    );
  }

  updateItem(item:groceryItem, property:string, value:string|number|boolean){
    this.items.forEach((curItem,index) => {
      if(curItem.id === item.id){
        this.items[index][property] = value;
      }
    });
    return this.items;
  }
}