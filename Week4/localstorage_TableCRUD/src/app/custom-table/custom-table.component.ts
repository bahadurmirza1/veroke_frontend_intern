import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Agent } from 'http';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterOutlet],              
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {

cols:any[]=[
  {key:'id',label:'ID'},
  {key:'name',label:'Name'},
  {key:'email',label:'Email'},
  {key:'phone',label:'Phone'},
  {key:'address',label:'Address'},
  {key:'actions',label:'Actions'}
]
actions:any[]=[
  {key:'view',label:'View'},
  {key:'edit',label:'Edit'},
  {key:'delete',label:'Delete'}
]

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
  }
}


}