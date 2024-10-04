
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.css'
})
export class InfoDialogComponent {
  @Input() message: string = '';

  close() {
    
  }
}
