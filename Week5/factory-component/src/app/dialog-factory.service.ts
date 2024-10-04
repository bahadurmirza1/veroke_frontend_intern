import { Injectable, ApplicationRef, Injector, EmbeddedViewRef, ComponentFactoryResolver } from '@angular/core';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogFactory {
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  openDialog(type: 'info' | 'confirm', data: any) {
    let component: any;

    switch (type) {
      case 'info':
        component = this.resolver.resolveComponentFactory(InfoDialogComponent);
        break;
      case 'confirm':
        component = this.resolver.resolveComponentFactory(ConfirmDialogComponent);
        break;
      default:
        throw new Error('Unknown dialog type');
    }

    const dialogRef = component.create(this.injector);
    dialogRef.instance.message = data.message;

    this.appRef.attachView(dialogRef.hostView);

    const domElem = (dialogRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    dialogRef.instance.close = () => {
      this.appRef.detachView(dialogRef.hostView);
      dialogRef.destroy();
      domElem.remove();
    };

    return dialogRef;
  }
}
