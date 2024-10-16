import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css'
})
export class CustomTableComponent {
  headers=[
    'name','email','type','phone'
  ]
  allRecords=[]
  ngOnInit(){
    this.allRecords=JSON.parse(localStorage.getItem('admin_customerData')!)
  }
}
