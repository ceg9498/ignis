import { Component } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { RecipesService } from './recipes.service';
import { GroceryItemsService } from './grocery-items.service';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  constructor (
    private _idbServ: IndexedDBService,
    private _recipesServ: RecipesService,
    private _groceryServ: GroceryItemsService,
    private _scheduleServ: ScheduleService,
  ) {
    
  }

  ngOnInit() {
    this._idbServ.initDB('ignis',['recipes','groceries','schedule']).subscribe(
      (result) => {
        console.log(result);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("DB Initialization Complete.")
      }
    )
    this._recipesServ.init();
    this._groceryServ.init();
    this._scheduleServ.init();
  }
}
