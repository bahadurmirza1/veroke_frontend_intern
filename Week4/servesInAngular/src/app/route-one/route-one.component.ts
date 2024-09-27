import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route-one',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './route-one.component.html',
  styleUrl: './route-one.component.css'
})
export class RouteOneComponent {
name:any='';
age:any='';
items: any;


onSend(){
  if(this.name && this.age){
    this.std.sendData({name:this.name,age:this.age});
    }else{
      alert('Please Fill the Field');
    }
}



  constructor(private std: StudentService) {}

  ngOnInit() {
    this.subscription=this.std.data$.subscribe(data => {
      this.items = data;
    });
 
  }

  private subscription!: Subscription;

  ngOnDestroy():void{
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
