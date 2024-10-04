import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, inject, model, signal,Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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

export interface DialogData {
  email: string;
  name: string;
  phone:string;
  address:string;

}

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,MatTableModule,MatButtonModule,MatDividerModule,MatIconModule,CommonModule,RouterLink,RouterLinkActive,RouterOutlet],              
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent {

// cols:any[]=[
//   {key:'id',label:'ID'},
//   {key:'name',label:'Name'},
//   {key:'email',label:'Email'},
//   {key:'phone',label:'Phone'},
//   {key:'address',label:'Address'},
//   {key:'actions',label:'Actions'}
// ]

i:number=0;
cols:any[]=[
  'id',
  'name',
  'email',
  'phone',
  'address',
  'actions',
]
actions:any[]=[
  {key:'view',label:'View'},
  {key:'edit',label:'Edit'},
  {key:'delete',label:'Delete'}
]

// actions:any[]=[
//   'view',
//   'edit',
//   'delete'
// ]

Records:any;


constructor(private route:Router){
  
}



ngOnInit(){
  this.getData();
}
getData(){
  debugger
  this.Records=localStorage.getItem('AllRecords');
  this.Records=this.Records?JSON.parse(this.Records):[];
  console.log(this.Records)

}
onClear(){
  localStorage.clear();
  this.getData();
}


onActionClick(id:number,type:string){

  console.log('id---type',id,type)

  if(type=='view'|| type=='edit'){
    this.route.navigate(['form',type,id])
  }
  else if(type=='delete'){
    this.Records.forEach((r:any,index:number) => {
      if(r.id==id){
        this.Records.splice(index,1)
      }
    });
    localStorage.setItem('AllRecords',JSON.stringify(this.Records))
    this.getData();
  }
}

readonly Formobj = signal('');
  readonly dialog = inject(MatDialog);
  PrevRecords:any;
  Recordz:any[]=[];
  id:number=1;

openDialog(): void {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    data: {formobj: this.Formobj()},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if (result !== undefined) {
      this.Formobj.set(result);
      
      this.PrevRecords=localStorage.getItem('AllRecords');
    this.PrevRecords=this.PrevRecords?JSON.parse(this.PrevRecords):[];
    if(this.PrevRecords.length>=1){
    this.PrevRecords.forEach((element:any) => {
      this.Recordz.push(element);
    });
  }

  this.Recordz.length==0?this.id=1:this.id=this.Recordz[this.Recordz.length-1].id+1;
    
    // this.id=this.AllRecords.length+1;
    result['id']=this.id;
    this.Recordz.push(result);
    localStorage.setItem('AllRecords',JSON.stringify(this.Recordz));
    console.warn(this.Recordz);

    // this.route.navigate(['']);
    // this.getData();
  
    }
  });
}
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
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
})

export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  
  readonly name = model(this.data.name);
  readonly email = model(this.data.email);
  readonly phone = model(this.data.phone);
  readonly address = model(this.data.address);

  Records: any;

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  formdata:FormGroup;
  constructor(private fb:FormBuilder){
    this.formdata=this.fb.group({
      id:[],
      name:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      address:['',Validators.required],
    })
  }



  onSave(){
    // this.addNew();
  }
  PrevRecords:any;
  id:number=1;
  Recordz:any[]=[];

  addNew(){
    if(this.Recordz.length==0){
      this.PrevRecords=localStorage.getItem('AllRecords');
    this.PrevRecords=this.PrevRecords?JSON.parse(this.PrevRecords):[];
    if(this.PrevRecords.length>=1){
    this.PrevRecords.forEach((element:any) => {
      this.Recordz.push(element);
    });
  }
    }
    
    this.Recordz.length==0?this.id=1:this.id=this.Recordz[this.Recordz.length-1].id+1;
    
    // this.id=this.AllRecords.length+1;
    this.formdata.value.id=this.id;
    this.Recordz.push(this.formdata.value);
    localStorage.setItem('AllRecords',JSON.stringify(this.Recordz));
    console.warn(this.Recordz)
    this.formdata.reset();
  }

}