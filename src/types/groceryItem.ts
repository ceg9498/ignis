import { ingredient } from './ingredient';
import { quantity } from './quantity';

export type groceryItem = {
  id?: string,
  quantity: quantity,
  name: string,
  isDone: boolean
};

export class GroceryItem implements groceryItem {
  quantity: quantity;
  name: string;
  isDone: boolean;

  constructor(ingredient: ingredient, isDone: boolean) {
    this.quantity = ingredient.quantity;
    this.name = ingredient.name;
    this.isDone = isDone;
  }
}