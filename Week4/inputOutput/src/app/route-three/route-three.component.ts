import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-route-three',
  standalone: true,
  imports: [CommonModule,FormsModule,CardComponent],
  templateUrl: './route-three.component.html',
  styleUrl: './route-three.component.css'
})
export class RouteThreeComponent {
  dataArray!:any[];
}
