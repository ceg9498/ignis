import { Injectable } from '@angular/core';

@Injectable()
export class ScheduleService {
  schedule = [];
  
  constructor() { }

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
  }

  getMeals(){
    return this.schedule;
  }

  getToday() {
    let today = new Date();
    today.setHours(0,0,0,0);
    let res = this.schedule.filter((day)=> day.date.valueOf() === today.valueOf());
    if(res.length !== 0){
      return res[0].meals;
    }
    return null;
  }
}