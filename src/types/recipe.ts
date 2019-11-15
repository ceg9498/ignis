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
    } else {
      this.ingredients = [];
    }
    if(instructions){
      this.instructions = [...instructions];
    } else {
      this.instructions = [];
    }
  }

  setName(name:string):void{
    this.name = name;
  }

  getName():string{
    return this.name;
  }

  addIngredient(ingredient:ingredient):void{
    this.ingredients.push(ingredient);
  }

  getIngredients():ingredient[]{
    return this.ingredients;
  }

  addInstruction(instruction:string):void{
    this.instructions.push(instruction);
  }

  getInstructions():string[]{
    return this.instructions;
  }
}