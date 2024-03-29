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
    private _notice: MessageService,
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

  addAndSaveItem(item:groceryItem) {
    item = this.addItem(item);
    this.saveItem(item);
  }

  saveItem(item:groceryItem){
    this._idbServ.addOrUpdateOne("ignis", "groceries", item).subscribe(
      (result) => {
        this._notice.openPlain(
          item.name + " has been added.",
          10000
        );
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
    item.isDone ? this.completeItems.push({...item}) : this.incompleteItems.push({...item});

    return item;
  }

  getItems(){
    return {complete: this.completeItems, incomplete: this.incompleteItems};
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
    return {complete: this.completeItems, incomplete: this.incompleteItems};
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

    this._notice.open(
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
    item[property] = value;

    if(property === "isDone"){
      if(item.isDone){
        this.incompleteItems.forEach((curItem,index) => {
          if(curItem.id === item.id){
            this.incompleteItems.splice(index, 1);
          }
        });
        this.completeItems.push(item);
      } else {
        this.completeItems.forEach((curItem,index) => {
          if(curItem.id === item.id){
            this.completeItems.splice(index, 1);
          }
        });
        this.incompleteItems.push(item);
      }
    }
    this.saveItem(item);
    return {complete: this.completeItems, incomplete: this.incompleteItems};
  }
}