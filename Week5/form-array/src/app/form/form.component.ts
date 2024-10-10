import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  myForm: FormGroup;
  readonly dialog=inject(MatDialog);

  openDialog():void{
    const dialogRef=this.dialog.open(DialogComponent, {
      width: '100px',
      data:{title:"Bahadur"}
    });
    dialogRef.afterClosed().subscribe(response=>{
      if(response!==undefined){
        console.log('Response from Dialog',response);
      }
      
    })
    // setTimeout(() => {
    //   this.dialog.closeAll();
    // }, 2000);
  }
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name:[''],
      items: this.fb.array([this.fb.control(''),this.fb.control(''),this.fb.control('')])
    });
  }

  // get contacts(): FormArray{
  //   return this.registerationForm.get('contacts') as FormArray;
  // }

  get items(): FormArray { 
    return this.myForm.get('items') as FormArray;
  }        

  // item(): void {
  //   console.log(this.myForm.value);
  // } 

  // addItem(): void {
  //   this.items.push(this.fb.control('')); 
  // }
  // removeItem(index: number): void {
  //   this.items.removeAt(index); 
  // }
}
