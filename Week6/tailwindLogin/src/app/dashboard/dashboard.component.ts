import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink,MatToolbarModule,MatListModule,RouterOutlet,MatButtonModule,MatDividerModule,MatIconModule,MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private route:Router){

  }
  headers=[
    {
      label:'Name',key:'name',
  },
  {
    label:'Email',key:'email',
},
{
  label:'Type',key:'type',
},
{
  label:'Phone',key:'phone',
}
]
    
  

adminData:any[]=[]
allRecords:any[]=[]
  adminClick(){
    this.allRecords=[];
    this.adminData=[];
    this.allRecords=localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')!):[]
   this.allRecords.forEach((e:any,index:number) => {
      if(e.type=='admin'){
        this.adminData.push(this.allRecords[index])
      }
    });

    this.allRecords=this.adminData;

  }
  customerData:any[]=[]
  customerClick(){
    this.allRecords=[];
    this.customerData=[];
    this.allRecords=localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')!):[]
   this.allRecords.forEach((e:any,index:number) => {
      if(e.type=='customer'){
        this.customerData.push(this.allRecords[index])
      }
    });

    this.allRecords=this.customerData;

  }

  onLogoutClick(){
    localStorage.removeItem('key');
    window.location.reload()
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem('key')){
      return true
    }else{
      return false;
    }
    
  }
getLoginData:any;
name:string='';
type:string='';

  ngOnInit(){
    
    // console.log(this.isLoggedIn())
    // if (!this.isLoggedIn()){
    //   this.route.navigate(['/'])
    // }

    this.getLoginData=localStorage.getItem('login')?JSON.parse(localStorage.getItem('login')!):null
    this.name=this.getLoginData.name;
    this.type=this.getLoginData.type;

  }
  
}
