import { ingredient } from './ingredient';

export type recipe = {
  name: string,
  ingredients: ingredient[],
  instructions: string[]
};