import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [RouterOutlet,MatSidenavModule,CommonModule,MatButtonModule,MatDividerModule, MatIconModule],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.css'
})
export class HomeSliderComponent {
  showFiller = false;

  constructor(private route:Router){

  }
  flag:boolean=false;
  flag2:boolean=false;

  onTableClick(){
    this.flag2=false;
    this.flag=true;
    this.route.navigate(['custom-table'])
  }
  onFormClick(){
    this.flag=false;
    this.flag2=true;
    this.route.navigate(['form'])

  }
}
