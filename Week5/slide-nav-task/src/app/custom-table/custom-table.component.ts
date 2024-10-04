import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, inject, model, signal,Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

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
import { ApiService } from '../service/api.service';

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
    MatPaginatorModule,
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
  Records:any[]=[];

  dataSource = new MatTableDataSource(this.Records);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }
  

  constructor(private route:Router,private localservice:LocalstoreService,private apiService:ApiService){
  
  }
  upperCase(s:any){
    return s.toUpperCase()

  }
  gotoForm(){
    this.route.navigate(['form/add/new']);
  }
  ngOnInit(){
    this.Records=this.localservice.getLocalData();
    this.dataSource = new MatTableDataSource(this.Records);

    // this.apiService.getData().subscribe(
    //   response => {
    //     this.Records = response;
    //     this.dataSource = new MatTableDataSource(this.Records);
    //   },
    //   error => {
    //     console.error('Error fetching data', error);
    //   }
    // );
    

  }
  onClear(){
    localStorage.clear();
    window.location.reload();
  }
  delId:any;

  onActionClick(id:number,type:string){
    this.localservice.setIdType(id,type);
    if(type!="delete"){
      // this.openDialog();
      this.route.navigate(['form',type,id])

    }else{
      this.openDialog();
      this.delId=id;
      
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
    this.localservice.delObjbyId(this.delId);
      this.Records=this.localservice.getLocalData();
      // this.dataSource = new MatTableDataSource(this.Records);
      window.location.reload();

  }

});
}
}
