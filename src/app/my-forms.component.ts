import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: `./my-forms.component.html`,
  styleUrls: ['./my-forms.component.css']
})
export class MyFormsComponent {
  heroForm: FormGroup; // <--- heroForm is of type FormGroup

  constructor(private fb: FormBuilder) { // <--- inject FormBuilder
    this.createForm();
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', [ Validators.required,
                   Validators.minLength(3),
                   Validators.maxLength(6)] ], // <--- the FormControl called "name"
      street: ['', [ Validators.required ]],
      city: ['', [ Validators.required ]]
    });
  }
}
