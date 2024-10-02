import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, inject, model, signal,Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogData } from '../custom-table/custom-table.component';
import { LocalstoreService } from '../service/localstore.service';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  
  readonly name = model(this.data.name);
  readonly email = model(this.data.email);
  readonly phone = model(this.data.phone);
  readonly address = model(this.data.address);

  onNoClick(): void {
    this.dialogRef.close(); 
  }
  
  formdata:FormGroup;
  type?:string;
  id?:number;
  Records:any[]=[]
  serialno:number=1

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

  formRecord:any;

  onSubmit(){
    if(this.type=='add'){
      if(this.formdata.valid){
      this.Records=this.localservice.getLocalData();
      this.Records.length==0?this.serialno=1:this.serialno=this.Records[this.Records.length-1].id+1
      this.formdata.value.id=this.serialno;
      this.formRecord=this.formdata.value;
      this.localservice.setLocalData(this.formdata.value);
      this.formdata.reset();
      window.location.reload();
      this.routeNav.navigate(['']);
      }else{
        alert("Please Fill the Required Field!")
      }

    }
    else if(this.type=='edit'){
      if(this.formdata.valid){
      this.formdata.value.id=this.id;
      this.localservice.updateObjbyId(this.formdata.value)
      this.formdata.reset();
      window.location.reload();
      this.routeNav.navigate(['']);
      }else{
      alert("Please Fill the Required Field!")
      }
    }
    else if(this.type=='view'){
      this.routeNav.navigate([''])
    }
    this.dialogRef.close();
  }
  onYes(){
    
  }
}