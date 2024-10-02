import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../custom-table/custom-table.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SuccessDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  
  readonly name = model(this.data.name);
  readonly email = model(this.data.email);
  readonly phone = model(this.data.phone);
  readonly address = model(this.data.address);

  onNoClick(): void {
    this.dialogRef.close(); 
  }
  
  // formdata:FormGroup;
  // type?:string;
  // id?:number;
  // Records:any[]=[]
  // serialno:number=1

  // constructor(private fb:FormBuilder,private route:ActivatedRoute,private routeNav:Router,private localservice:LocalstoreService){
  //   this.formdata=this.fb.group({
  //     id:[],
  //     name:['',Validators.required],
  //     email:['',Validators.required],
  //     phone:['',Validators.required],
  //     address:['',Validators.required],
  //   })
  // }

  // ngOnInit(){
  //   debugger
  //   this.id=this.localservice.getIdType().id;
  //   this.type=this.localservice.getIdType().type;
  //   if(this.type=='view' || this.type=='edit'){ 
  //     if(this.id){
        
  //       this.formdata.patchValue(this.localservice.getObjbyId(this.id));
  //     }
  //   }
  // }

  formRecord:any;

  // onSubmit(){
  //   if(this.type=='add'){
  //     if(this.formdata.valid){
  //     this.Records=this.localservice.getLocalData();
  //     this.Records.length==0?this.serialno=1:this.serialno=this.Records[this.Records.length-1].id+1
  //     this.formdata.value.id=this.serialno;
  //     this.formRecord=this.formdata.value;
  //     this.localservice.setLocalData(this.formdata.value);
  //     this.formdata.reset();
  //     window.location.reload();
  //     this.routeNav.navigate(['']);
  //     }else{
  //       alert("Please Fill the Required Field!")
  //     }

  //   }
  //   else if(this.type=='edit'){
  //     if(this.formdata.valid){
  //     this.formdata.value.id=this.id;
  //     this.localservice.updateObjbyId(this.formdata.value)
  //     this.formdata.reset();
  //     window.location.reload();
  //     this.routeNav.navigate(['']);
  //     }else{
  //     alert("Please Fill the Required Field!")
  //     }
  //   }
  //   else if(this.type=='view'){
  //     this.routeNav.navigate([''])
  //   }
  //   this.dialogRef.close();
  // }
  onYes(){
    
  }
}
