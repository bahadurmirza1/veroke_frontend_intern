import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeSliderComponent } from "./home-slider/home-slider.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeSliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'slide-nav-task';
}
