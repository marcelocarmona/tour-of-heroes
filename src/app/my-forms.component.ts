import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

class Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

@Component({
  moduleId: module.id,
  templateUrl: `./my-forms.component.html`,
  styleUrls: ['./my-forms.component.css'],
})
export class MyFormsComponent implements OnInit {


  heroForm: FormGroup; // <--- heroForm is of type FormGroup
  states:string[] = ['CA', 'MD', 'OH', 'VA'];

  constructor(private fb: FormBuilder) { // <--- inject FormBuilder
    this.createForm();
  }

  ngOnInit(): void {
    this.heroForm.reset({
      name: ''
    });
    this.setAddresses([{
      street: 'calle',
      city: 'ciudad',
      state: 'state',
      zip: 'zip'
    }]);
  }

  ngOnChanges(): void {

  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', [ Validators.required,
                   Validators.minLength(3),
                   Validators.maxLength(6)] ], // <--- the FormControl called "name"
      secretLairs: this.fb.array([]),
      power: '',
      sidekick: ''
    });
  }

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  addAddress() {
    console.log('agregar address');
    this.addLair()
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  };

  addLair() {
    this.secretLairs.push(this.fb.group({
      street: 'calle',
      city: 'ciudad',
      state: 'state',
      zip: 'zip'
    }));
  }

  removeAddress() {
    this.secretLairs.removeAt(this.secretLairs.length - 1)
  }
}
