import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,MatIconModule,CommonModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {
  constructor(private route:Router,private apiservice:ApiService){

  }
  cols=['id','name','email','role','phone','actions']
  actions:any[]=[
    {key:'view',label:'View'},
    {key:'edit',label:'Edit'},
    {key:'delete',label:'Delete'}
  ]
  Records=[]

  ngOnInit(){
    this.apiservice.getAllData().subscribe(
      response => {
        this.Records = response;
        console.log('REc',this.Records)

      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }
  addRecord(){
    this.route.navigate(['form/add/new'])
  }
  onActionClick(id:number,type:string){
    if(type=='edit'){
      this.route.navigate(['form',type,id])

     
    }else if(type=='delete'){
      this.apiservice.DeleteDataByID(id).subscribe(
        response => {
          console.log(response)
         window.location.reload()
        },
        error => {
          console.error('Error fetching data', error);
          alert("Error")

        }
      );
    }else if(type=='view'){
      this.route.navigate(['form',type,id])

      // this.apiservice.getDataByID(id).subscribe(
      //   response => {
      //     console.log(response)
      //   },
      //   error => {
      //     console.error('Error fetching data', error);
      //     alert("Error")

      //   }
      // );
    }
  }
}
