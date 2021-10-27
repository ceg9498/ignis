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

  constructor(
    id: number|string, 
    name: string, 
    ingredients?: ingredient[], 
    instructions?: string[]
  ) {
    this.name = name;
    if(id === null) {
      this.generateID();
    } else {
      this.id = id;
    }
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

  generateID():void{
    let hash = 0;
    for(let i = 0; i < this.name.length; i++) {
      hash = hash * 31 + this.name.charCodeAt(i);
    }
    this.id = hash % 1000000;
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