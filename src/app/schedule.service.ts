import { Injectable } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { GenerateIDService } from './generate-id.service';

@Injectable()
export class ScheduleService {
  schedule = [];
  today = [];
  todayDate;
  
  constructor(
    private _idbServ: IndexedDBService,
    private _idServ: GenerateIDService
  ) { }

  init() {
    this.todayDate = new Date();
    this.todayDate.setHours(0,0,0,0);
    this._idbServ.getData("ignis", "schedule").subscribe(
      (result) => {
        this.addMeal(result.date, result.recipe);
        
        if(result.date.valueOf() === this.todayDate.valueOf()){
          this.today.push(result.recipe);
        }
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
    this.addMeal(date, recipe);
    this.saveItem({id: this._idServ.generate(), date: date, recipe: recipe});
  }

  addMeal(date, recipe){
    let isPlanned = false;
    this.schedule.forEach((item, index)=>{
      if(item.date.valueOf() == date.valueOf()){
        this.schedule[index].meals.push(recipe);
        isPlanned = true;
      }
    });
    if(!isPlanned){
      this.schedule.push({
        date: date,
        meals: [recipe]
      });
    }
    this.schedule.sort((a, b)=> a.date.valueOf() - b.date.valueOf());
  }

  getMeals(){
    return this.schedule;
  }

  getToday() {
    return this.today;
  }
}