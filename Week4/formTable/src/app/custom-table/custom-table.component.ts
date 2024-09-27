import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule],              
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {
@Input() headers:any[]=[];  
@Input() FormRecords:any[]=[];
@Input() actions:any[]=[];
@Output() public UserTableEvent=new EventEmitter<any>();

// onDelete(i:number){
//   this.FormRecords.splice(i,1);
// }
// onView(id:number,type:string){
//   this.UserTableEvent.emit({id:id,type:type})
// }

// onEdit(id:number,type:string){
//   this.UserTableEvent.emit({id:id,type:type})
// }

onActionClick(id:number,type:string){
  console.log('ID',id,'type',type)
  if(type=='delete'){
    // this.FormRecords.splice(id,1);
    this.FormRecords.forEach((e,index:number) => { 
      if(e.id==id){
        this.FormRecords.splice(index,1)
      }
    });
  }else{
    debugger
  this.UserTableEvent.emit({id:id,type:type})
  }
}
}
