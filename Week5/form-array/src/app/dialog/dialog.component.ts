import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  inputData:any;
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data:any){

  }
  ngOnInit():void{
    this.inputData=this.data;
  }

  noClick(){
    this.dialogRef.close("NO Click")
  }
  okClick(){
    this.dialogRef.close("OK Click")
  }

}
