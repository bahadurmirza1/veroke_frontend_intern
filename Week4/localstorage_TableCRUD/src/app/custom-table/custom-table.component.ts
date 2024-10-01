import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,MatDividerModule,MatIconModule,CommonModule,RouterLink,RouterLinkActive,RouterOutlet],              
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
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


}