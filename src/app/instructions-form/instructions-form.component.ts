import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-instructions-form',
  templateUrl: './instructions-form.component.html',
  styleUrls: ['./instructions-form.component.css']
})
export class InstructionsFormComponent implements OnInit {
  @Output() instruction = new EventEmitter();
  instructionsForm:FormGroup;

  constructor() { }

  ngOnInit() {
    this.instructionsForm = new FormGroup({
      step: new FormControl('')
    });
  }

  onSubmit() {
    this.instruction.emit(this.instructionsForm.value.step);
    this.instructionsForm.reset();
  }
}