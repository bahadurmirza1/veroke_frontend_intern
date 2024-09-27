import { Component } from '@angular/core';
import { CustomTableComponent } from '../custom-table/custom-table.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CustomTableComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  cols:any[]=[{key:'id',label:'ID'},{key:'name',label:'Name'},{key:'experience',label:'Experience'},{key:'designation',label:'Designation'},{key:'actions',label:'Actions'}];
  TableData:any[]=[
    {id:1,name:'Ali',experience:'2 Year',designation:'Backend Developer'},
    {id:2,name:'Arslan',experience:'1 Year',designation:'Junior Developer'},
    {id:3,name:'Usama',experience:'5 Year',designation:'Frontend Developer'},
    {id:4,name:'Ali',experience:'2 Year',designation:'Backend Developer'},
    {id:5,name:'Arslan',experience:'1 Year',designation:'Junior Developer'},
    {id:6,name:'Usama',experience:'5 Year',designation:'Frontend Developer'},
  ];
  actions: any = [
    {key :'delete', label:"Delete"}
  ];
}
