import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { CommonModule } from '@angular/common';
import { LocalstoreService } from '../localstore.service';
import {MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule,CommonModule,RouterLinkActive,RouterLink,MatToolbarModule,MatListModule,RouterOutlet,MatButtonModule,MatDividerModule,MatIconModule,MatSidenavModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private route:Router,private localstore:LocalstoreService){

  }

//   headers=[
//     {
//       label:'Name',key:'name',
//   },
//   {
//     label:'Email',key:'email',
// },
// {
//   label:'Type',key:'type',
// },
// {
//   label:'Phone',key:'phone',
// }
// ]

headers=[
  'name','email','type','phone'
]
    
  

adminData:any[]=[]
allRecords:any[]=[]
adminFlag='false';
  adminClick(){
    this.adminFlag='true'
    localStorage.setItem('adminFlag','true')
    this.customerFlag='false'
    localStorage.setItem('customerFlag','false')



    this.allRecords=[];
    this.adminData=[];
    this.allRecords=localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')!):[]
   this.allRecords.forEach((e:any,index:number) => {
      if(e.type=='admin'){
        this.adminData.push(this.allRecords[index])
      }
    });
    localStorage.setItem('admin_customerData',JSON.stringify(this.adminData))
    this.route.navigate(['main/dashboard/table']);
    setTimeout(()=>
      window.location.reload()
    ,10)
    

  }
  customerData:any[]=[]
  customerFlag='false'
  customerClick(){
    this.customerFlag='true'
    localStorage.setItem('customerFlag','true')
    this.adminFlag='false'
    localStorage.setItem('adminFlag','false')

    this.allRecords=[];
    this.customerData=[];
    this.allRecords=localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')!):[]
   this.allRecords.forEach((e:any,index:number) => {
      if(e.type=='customer'){
        this.customerData.push(this.allRecords[index])
      }
    });

     
    
    localStorage.setItem('admin_customerData',JSON.stringify(this.customerData))

    this.route.navigate(['main/dashboard/table'])
    setTimeout(()=>
      window.location.reload()
    ,10)

  }
  dialogref:any
  readonly dialog = inject(MatDialog);
  openDialog(titl:string,sms:string): void {
    this.dialogref=this.dialog.open(DialogComponent, {
      width: '250px',
      data:{title:titl,msg:sms}
    });

    this.dialogref.afterClosed().subscribe((result: any) => {
       
      if(result=='yes'){
        localStorage.removeItem('login');
        window.location.reload()
      }
    });
  }

  onLogoutClick(){
    this.openDialog("Logout","Do you want to Logout?")
    
  }

  // isLoggedIn(): boolean {
  //   if(localStorage.getItem('key')){
  //     return true
  //   }else{
  //     return false;
  //   }
    
  // }
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

    this.allRecords=this.localstore.getLocalData();

  this.adminFlag=localStorage.getItem('adminFlag')!
  
  this.customerFlag=localStorage.getItem('customerFlag')!


  }

  goForEdit(){
      // localStorage.setItem('type','edit')
    localStorage.setItem('adminFlag','false')
    localStorage.setItem('customerFlag','false')
    
    this.route.navigate(['main/dashboard/form']);
    setTimeout(()=>
      window.location.reload()
      ,10)

  }
  
}
