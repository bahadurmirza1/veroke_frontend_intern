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
import { LocalstoreService } from '../service/localstore.service';
import { DialogComponent } from '../dialog/dialog.component';

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
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {
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

  constructor(private route:Router,private localservice:LocalstoreService){
  
  }
  ngOnInit(){
    this.Records=this.localservice.getLocalData();
  }
  onClear(){
    localStorage.clear();
    window.location.reload();
  }
  onActionClick(id:number,type:string){
    this.localservice.setIdType(id,type);
    if(type!="delete"){
      this.openDialog();

    }else{
      this.localservice.delObjbyId(id);
      this.Records=this.localservice.getLocalData();
    }
    
  }

  
readonly Formobj = signal('');
readonly dialog = inject(MatDialog);

openDialog(): void {
const dialogRef = this.dialog.open(DialogComponent, {
  data: {formobj: this.Formobj()},
});

dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  if (result !== undefined) {
  }

});
}
}
