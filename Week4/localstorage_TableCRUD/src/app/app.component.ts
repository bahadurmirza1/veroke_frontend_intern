import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomTableComponent } from "./custom-table/custom-table.component";
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustomTableComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'localstorage_TableCRUD';
}
