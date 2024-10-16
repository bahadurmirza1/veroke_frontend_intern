import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { merge, single } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { LocalstoreService } from '../localstore.service';
import { DialogComponent } from '../dialog/dialog.component';


interface TypeList {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatSelectModule,CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})



export class SignupComponent {

  typeList: TypeList[] = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'customer', viewValue: 'Customer'},
  ];

  protected readonly value = signal('');
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hide2 = signal(true);
  clickEvent2() {
    this.hide2.set(!this.hide2());
  }

  formData:FormGroup;

  passwordMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confpassword')?.value;
    return password === confirmPassword ? null : { 'mismatch': true };
  }

  constructor(private fb : FormBuilder,private route:Router,private localstore:LocalstoreService){
    this.formData=this.fb.group(
      {
        name:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
        email:['',[Validators.required,Validators.email]],
        phone:['',[Validators.required,Validators.pattern('^[0-9]+$')]],
        type:['',[Validators.required]],
        password:['',[Validators.required,Validators.minLength(8)]],
        confpassword:['',[Validators.required]],
      }
  )
  }

  ngOnInit(){
    this.typeFromStore=localStorage.getItem('type')!
    if(this.typeFromStore=='edit'){
      this.formData.patchValue(JSON.parse(localStorage.getItem('login')!))
    }
  }


  flagConfirm=false;



  dialogref:any
  readonly dialog = inject(MatDialog);
  openDialog(titl:string,sms:string): void {
    this.dialogref=this.dialog.open(DialogComponent, {
      width: '250px',
      data:{title:titl,msg:sms}
    });
  }

  
  signupData:any[]=[]
  typeFromStore='';
  getOldData:any[]=[]
  onSignupClick(){

    if(this.formData.valid){


      this.formData.reset();
      this.openDialog('Congratulation 🎉',' You Successfully Created your Account');

      setTimeout(() => {
        this.dialogref.close()
    }, 3000);
    this.route.navigate(['auth/login'])
    }

  }

  gotoSignin(){
    this.route.navigate(['auth/login'])
  }

}


