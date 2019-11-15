import { ingredient } from './ingredient';

export type recipe = {
  name: string,
  ingredients: ingredient[],
  instructions: string[]
};

export class Recipe implements recipe {
  name: string = null;
  ingredients: ingredient[] = null;
  instructions: string[] = null;

  constructor(name: string, ingredients?: ingredient[], instructions?: string) {
    this.name = name;
    if(ingredients){
      this.ingredients = [...ingredients];
    }
    if(instructions){
      this.instructions = [...instructions];
    }
  }
}