import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  formData: FormGroup;
  @Input() findobj: any[] = [];
  id: number = 0;
  @Input() type: string = '';
  @Output() public UserFormEvent = new EventEmitter<any>();
  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      id: [],
      name: ['',Validators.required],
      email: ['',Validators.required],
      phone: ['',Validators.required],
      address: ['',Validators.required],
      education: ['',Validators.required]
    })
  }
  patchData() {
    this.formData.patchValue(this.findobj);
    // this.type = this.find.type;
  }
  ngOnChanges(){
    // this.patchData();
    this.formData.patchValue(this.findobj);
  }
  // ngOnChanges(changes:SimpleChanges){
  //   // this.formData.patchValue(changes['findobj'].currentValue[0]);
  //   // this.type=this.findobj[1].type;
  //   console.log(".............",changes['findobj'].currentValue)
  // }

  onClear(){
    this.formData.reset();
    this.type='add';
  }
  onSubmit() {
    if(this.formData.invalid){
      alert('Please Fill the Field!')
    }
    else{
    let dict = {
      element: this.formData.value,
      type: "add"
    }
    if (this.type == "add") {
      this.id += 1;
      this.formData.value.id = this.id;
      this.UserFormEvent.emit(dict);
      this.formData.reset();
    }
    else if (this.type == "edit"){
      dict.type="edit";
      this.UserFormEvent.emit(dict);
      this.formData.reset();
      this.type='add';
    }
  }


    // if (this.findobj.length >= 1 && (this.findobj[1].type == 'view' || this.findobj[1].type == 'edit')) {
    //   // this.formData.value.id=this.id;

    //   this.UserFormEvent.emit([this.formData.value, { id: this.findobj[1].id, type: this.findobj[1].type }]);
    //   console.log(this.formData.value);
    //   this.findobj[1].type = 'add';
    //   this.formData.reset();

    // }
    // else {
    //   this.id += 1;
    //   this.formData.value.id = this.id;
    //   this.UserFormEvent.emit([this.formData.value, { id: this.id, type: 'add' }]);
    //   console.log(this.formData.value);

    //   this.formData.reset();
    // }
  }
}
