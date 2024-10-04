import { Injectable } from '@angular/core';
import { DialogFactory } from './dialog-factory.service';

@Injectable({ providedIn: 'root' })
export class DialogManager {
  constructor(private dialogFactory: DialogFactory) {}

  openInfoDialog(message: string) {
    this.dialogFactory.openDialog('info', { message });
  }

  openConfirmDialog(message: string, onConfirm: () => void, onCancel: () => void) {
    const dialogRef = this.dialogFactory.openDialog('confirm', { message });

    dialogRef.instance.confirm = () => {
      onConfirm();
      dialogRef.instance.close();
    };

    dialogRef.instance.cancel = () => {
      onCancel();
      dialogRef.instance.close();
    };
  }
}
