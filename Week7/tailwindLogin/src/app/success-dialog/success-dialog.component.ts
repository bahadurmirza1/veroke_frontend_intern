import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SuccessDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SuccessDialogComponent>);

}
