import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { ingredient } from 'src/types/ingredient';

@Component({
  selector: 'app-ingredients-form',
  templateUrl: './ingredients-form.component.html',
  styleUrls: ['./ingredients-form.component.css']
})
export class IngredientsFormComponent implements OnInit {
  ingredientsForm:FormGroup;
  @Output() ingredient = new EventEmitter();
  @Input() edit:ingredient;

  constructor() { }

  ngOnInit() {
    if(this.edit){
      this.ingredientsForm = new FormGroup({
        quantity: new FormGroup({
          amount: new FormControl(this.edit.quantity.amount),
          unit: new FormControl(this.edit.quantity.unit)
        }),
        name: new FormControl(this.edit.name)
      });
    } else {
      this.ingredientsForm = new FormGroup({
        quantity: new FormGroup({
          amount: new FormControl(''),
          unit: new FormControl('')
        }),
        name: new FormControl('')
      });
    }
  }

  onSubmit() {
    // send data from this form to recipe-form
    this.ingredient.emit(this.ingredientsForm.value);
    // reset the form
    this.ingredientsForm.reset();
  }
}