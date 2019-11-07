import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Material } from './material';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { HomeComponent } from './home/home.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { GroceryItemsService } from './grocery-items.service';
import { ScheduleService } from './schedule.service';
import { MealPlanComponent } from './meal-plan/meal-plan.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { IngredientsFormComponent } from './ingredients-form/ingredients-form.component';
import { InstructionsFormComponent } from './instructions-form/instructions-form.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesService } from './recipes.service';

@NgModule({
  imports: 
  [ 
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Material,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'recipes', component: RecipeListComponent },
      { path: 'recipes/add', component: RecipeFormComponent },
      { path: 'recipes/edit/:recipeId', component: RecipeEditComponent },
      { path: 'recipes/id/:recipeId', component: RecipeDetailComponent },
      { path: 'groceries', component: GroceryListComponent },
      { path: 'meal-plan', component: MealPlanComponent },
     // { path: '**', component: ErrorPageComponent }
    ])
  ],
  declarations: 
  [ 
    AppComponent,
    TopBarComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    HomeComponent,
    GroceryListComponent,
    MealPlanComponent,
    RecipeFormComponent,
    IngredientsFormComponent,
    InstructionsFormComponent,
    ErrorPageComponent,
    RecipeEditComponent
  ],
  bootstrap: 
  [ 
    AppComponent
  ],
  providers: [GroceryItemsService, ScheduleService, RecipesService]
})
export class AppModule { }
