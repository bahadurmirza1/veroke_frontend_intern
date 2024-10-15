import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomTableComponent } from "./custom-table/custom-table.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'api_crud';
}
