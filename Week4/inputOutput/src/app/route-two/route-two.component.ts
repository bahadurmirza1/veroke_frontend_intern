import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-route-two',
  standalone: true,
  imports: [CommonModule,FormsModule,CardComponent],
  templateUrl: './route-two.component.html',
  styleUrl: './route-two.component.css'
})
export class RouteTwoComponent {
  dataArray!:any[];
}
