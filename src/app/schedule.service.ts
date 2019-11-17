import { Injectable } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { GenerateIDService } from './generate-id.service';

@Injectable()
export class ScheduleService {
  schedule = [];
  today = [];
  
  constructor(
    private _idbServ: IndexedDBService,
  ) { }

  init() {
    this._idbServ.getData("ignis", "schedule").subscribe(
      (result) => {
        result.meals.forEach((meal)=> {
          this.addMeal(result.date, meal);
        })
      },
      (err) => {
        console.error("Error reading schedule store:",err);
      }
    );
  }

  saveItem(item) {
    this._idbServ.addOrUpdateOne("ignis", "schedule", item).subscribe(
      (result) => {
        console.log("Add to db result:",result);
      },
      (err) => {
        console.log("Error writing to schedule store:",err);
      }
    )
  }

  addAndSaveMeal(date, recipe){
    let toSave = this.addMeal(date, recipe);
    this.saveItem(toSave);
  }

  addMeal(date, recipe){
    let day;
    let isPlanned = false;
    this.schedule.forEach((item, index)=>{
      if(item.date.valueOf() == date.valueOf()){
        this.schedule[index].meals.push(recipe);
        day = this.schedule[index];
        isPlanned = true;
      }
    });
    if(!isPlanned){
      day = {id: date.valueOf(), date:date, meals: [recipe]};
      this.schedule.push(day);
    }
    if(date.valueOf() === (new Date()).setHours(0,0,0,0).valueOf()) {
      this.today.push(recipe);
    }
    this.schedule.sort((a, b)=> a.date.valueOf() - b.date.valueOf());

    return day;
  }

  getMeals(){
    return this.schedule;
  }

  getToday() {
    return this.today;
  }
}