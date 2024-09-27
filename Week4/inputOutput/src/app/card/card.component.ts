import { CommonModule } from '@angular/common';
import { Component, Output,EventEmitter,Input } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  heading:string='';
  text:string='';
  sArray:any[]=[];
  @Output() public childEvent=new EventEmitter<any>(); 

  onSend(){
    this.sArray.push({heading:this.heading,text:this.text});
    console.log(this.sArray);
    this.childEvent.emit(this.sArray);
  }
 
}
