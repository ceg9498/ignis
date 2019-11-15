import { quantity } from './quantity';

export type ingredient = {
  quantity: quantity,
  name: string
};

export class Ingredient implements ingredient {
  quantity: quantity;
  name: string;

  constructor(name: string, quantity?: quantity) {
    this.name = name;
    if(quantity){
      this.quantity = quantity;
    }
  }
}