// confirm-dialog.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
  @Input() message: string = '';

  confirm() {
    // Logic to confirm the action
  }

  cancel() {
    // Logic to cancel the action
  }
}
