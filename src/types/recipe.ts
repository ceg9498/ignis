import { ingredient } from './ingredient';

export type recipe = {
  id: number|string,
  name: string,
  ingredients: ingredient[],
  instructions: string[]
};

export class Recipe implements recipe {
  id: number|string = null;
  name: string = null;
  ingredients: ingredient[] = null;
  instructions: string[] = null;

  constructor(id: number|string, name: string, ingredients?: ingredient[], instructions?: string) {
    this.id = id;
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