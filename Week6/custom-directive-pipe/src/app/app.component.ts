import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColorChangerDirective } from './color-changer.directive';
import { RemarkesPipe } from './remarkes.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ColorChangerDirective,RemarkesPipe,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'custom-directive-pipe';
  carray=[
    {weight:'bold',color:'red',pip:1},
    {weight:'bold',color:'yellow',pip:3},
    {weight:'bold',color:'green',pip:2}
  ];

  objtoString(obj:any){
    return JSON.stringify(obj)
  }
  
}
