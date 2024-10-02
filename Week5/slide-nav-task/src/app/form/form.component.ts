import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { LocalstoreService } from '../service/localstore.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatProgressSpinnerModule,MatIconModule,MatDividerModule,MatButtonModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  formdata:FormGroup;
  type?:string;
  id?:number;
  Records:any[]=[]
  serialno:number=1
  showSpinner: boolean = false;

  constructor(private fb:FormBuilder,private route:ActivatedRoute,private routeNav:Router,private localservice:LocalstoreService){
    this.formdata=this.fb.group({
      id:[],
      name:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      address:['',Validators.required],
    })
  }

  ngOnInit(){
    debugger
    this.id=this.localservice.getIdType().id;
    this.type=this.localservice.getIdType().type;
    if(this.type=='view' || this.type=='edit'){ 
      if(this.id){
        
        this.formdata.patchValue(this.localservice.getObjbyId(this.id));
      }
    }
  }

  onSubmit(){
    if(this.type=='add'){
      if(this.formdata.valid){
      this.Records=this.localservice.getLocalData();
      this.Records.length==0?this.serialno=1:this.serialno=this.Records[this.Records.length-1].id+1
      this.formdata.value.id=this.serialno;
      this.localservice.setLocalData(this.formdata.value);
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
        this.formdata.reset();
        this.openDialog();
      }, 2000);

      
      }
      else{
        alert("Please Fill the Required Field!")
      }
      
    }
    else if(this.type=='edit'){
      if(this.formdata.valid){
      this.formdata.value.id=this.id;
      this.localservice.updateObjbyId(this.formdata.value)
      this.showSpinner = true;
      setTimeout(() => {
        this.showSpinner = false;
        this.formdata.reset();
        this.openDialog();
        this.type='add';
        this.localservice.setIdType(this.formdata.value.id,this.type)
      }, 2000);

      
    }else{
      alert("Please Fill the Required Field!")
    }
  }
    else if(this.type=='view'){
      this.type='add';
      this.localservice.setIdType(this.formdata.value.id,this.type)
      this.formdata.reset();

    }
    

  }

  readonly Formobj = signal('');
readonly dialog = inject(MatDialog);

openDialog(): void {
const dialogRef = this.dialog.open(SuccessDialogComponent, {
  data: {formobj: this.Formobj()},
});

dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  if (result !== undefined) {

  }

});
}

  gotoTable(){

  }
}
