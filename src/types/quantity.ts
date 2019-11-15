export type quantity = {
  amount: number,
  unit: string
};

export class Quantity implements quantity {
  amount: number = null;
  unit: string = null;

  constructor(amount:number, unit:string){
    this.amount = amount;
    this.unit = unit;
  }
}