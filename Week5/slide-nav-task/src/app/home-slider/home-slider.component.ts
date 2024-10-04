import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute,NavigationEnd,Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {filter} from 'rxjs/operators';

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
  ngOnInit(): void {
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)
  )
      .subscribe((event: any) => {
          console.log(event.url);
          if (event.url=='/custom-table'){
            this.tableFlag=true;
            this. formFlag=false;
          }else if(event.url=='/form/add/new'){
            this. formFlag=true;
            this.tableFlag=false;
          }
      });
  }

  tableFlag:boolean=false;
   formFlag:boolean=false;

  onTableClick(){
    this.ngOnInit();
    this.route.navigate(['custom-table']);
    
  }
  onFormClick(){
    this.ngOnInit();
    this.route.navigate(['form/add/new'])

  }
}
