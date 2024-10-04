// app.component.ts
import { Component } from '@angular/core';
import { DialogManager } from './dialog-manager.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private dialogManager: DialogManager) {}

  showInfoDialog() {
    this.dialogManager.openInfoDialog('This is an info dialog!');
  }

  showConfirmDialog() {
    this.dialogManager.openConfirmDialog(
      'Are you sure?',
      () => {
        alert('Confirmed!');
      },
      () => {
        alert('Cancelled!');
      }
    );
  }
}
