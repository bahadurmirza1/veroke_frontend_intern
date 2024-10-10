import { Component } from '@angular/core';
import { ActivatedRoute, mapToCanActivate, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CustomSidebarComponent } from "./custom-sidebar/custom-sidebar.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'youtubesidebar';
  flag_sidenav:boolean=false;

  constructor(private route:Router){

  }
  ngOnInit(): void {
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)
  )
      .subscribe((event: any) => {
          console.log(event.url);
          if (event.url!='/'){
            this.flag_sidenav=false;
          }
      });
  }
  onMenuClick(){
    this.flag_sidenav=!this.flag_sidenav
  }
}
