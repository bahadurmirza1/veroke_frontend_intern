import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route-two',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './route-two.component.html',
  styleUrl: './route-two.component.css'
})
export class RouteTwoComponent {
  name:any='';
  age:any='';
  items:any;

  onSend(){
    if(this.name && this.age){
    this.std.sendData({name:this.name,age:this.age});
    }else{
      alert('Please Fill the Field');
    }

  }
  constructor(private std:StudentService){

  }

  ngOnInit() {
    this.std.data$.subscribe(data => {
      this.items = data;
    });

    console.log(this.items)
  }
}
