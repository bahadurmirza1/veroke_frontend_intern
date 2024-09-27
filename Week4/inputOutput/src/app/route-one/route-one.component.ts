import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-route-one',
  standalone: true,
  imports: [CommonModule,FormsModule,CardComponent],
  templateUrl: './route-one.component.html',
  styleUrl: './route-one.component.css'
})
export class RouteOneComponent {
   dataArray!:any[];
 
}
