import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  get items(): FormArray {
    return this.myForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.fb.control(''));
  }
  removeItem(index: number): void {
    this.items.removeAt(index); 
  }
}
