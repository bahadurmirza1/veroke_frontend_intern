import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {
  
  Records:any[]=[];

  cols:any[]=[
    {key:'id',label:'ID'},
    {key:'name',label:'Name'},
    {key:'email',label:'Email'},
    {key:'street',label:'Street'},
    {key:'city',label:'City'},
  ]
  actions:any[]=[
    {key:'view',label:'View'},
    {key:'edit',label:'Edit'},
    {key:'delete',label:'Delete'}
  ]

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.getData().subscribe(
      response => {
        this.Records = response;
        console.log(this.Records)
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
}

onSet(){
  this.apiService.setData().subscribe(
    response => {
      this.Records = response;
      console.log('--',this.Records)
    },
    error => {
      console.error('Error fetching data', error);
    }
  );
}
}
