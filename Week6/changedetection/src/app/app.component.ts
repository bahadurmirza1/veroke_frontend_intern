import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "./card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  cardData:any[]=[
    {
      title:'Laptop',
      desc:'This is the Description of Laptop'
    },
    {
      title:'Mobile',
      desc:'This is the Description of Mobile'
    },
    {
      title:'Bag',
      desc:'This is the Description of Bag'
    },
    {
      title:'Mouse',
      desc:'This is the Description of Mouse'
    },
    {
      title:'Keyboard',
      desc:'This is the Description of Keyboard'
    },
    {
      title:'Printer',
      desc:'This is the Description of Printer'
    }
  ]

  updateData(){
    this.cardData=[
      {
        title:'Laptop',
        desc:'This is the Description of Laptop'
      },
      {
        title:'Mobile',
        desc:'This is the Description of Mobile'
      },
      {
        title:'Bag',
        desc:'This is the Description of Bag'
      },
      {
        title:'Mouse',
        desc:'This is the Description of Mouse'
      },
      {
        title:'Keyboard',
        desc:'This is the Description of Keyboard'
      },
      {
        title:'Printer',
        desc:'This is the Description of Printer'
      }
    ]
  }

}
