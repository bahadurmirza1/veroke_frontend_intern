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
  selector: 'app-form',
  standalone: true,
  imports: [MatSelectModule,CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FormComponent {

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
  clickEvent2(event: MouseEvent) {
    this.hide2.set(!this.hide2());
    event.stopPropagation();
  }

  formData:FormGroup;
  errorMessage = signal('')
  phoneErrorMsg=signal('')
  nameErrorMsg=signal('')
  passErrorMsg=signal('')
  typeErrorMsg=signal('')
  confpasswordErrorMsg=signal('')


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
      },{ validators: this.passwordMatchValidator }
  )
  merge(this.email!.statusChanges, this.email!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

  merge(this.phone!.statusChanges, this.phone!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

  merge(this.name!.statusChanges, this.name!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

  merge(this.password!.statusChanges, this.password!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  merge(this.confpassword!.statusChanges, this.confpassword!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  merge(this.type!.statusChanges, this.type!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  ngOnInit(){
    this.formData.patchValue(JSON.parse(localStorage.getItem('login')!))
  }

  get email() {
    return this.formData.get('email');
  }
  get phone() {
    return this.formData.get('phone');
  }
  get name() {
    return this.formData.get('name');
  }
  get password() {
    return this.formData.get('password');
  }
  get type() {
    return this.formData.get('type');
  }
  get confpassword() {
    return this.formData.get('confpassword');
  }

  flagConfirm=false;

  updateErrorMessage() {
    if (this.email!.hasError('required')) {
      this.errorMessage.set('You must enter email');
    } else if (this.email!.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }

    if (this.phone!.hasError('required')) {
      this.phoneErrorMsg.set('You must enter phone number');
    }else if(this.phone!.hasError('pattern')){
      this.phoneErrorMsg.set('Phone doesnot contains Alphabets');
    } else {
      this.phoneErrorMsg.set('');
    }

    if (this.name!.hasError('required')) {
      this.nameErrorMsg.set('You must enter name');
    }else if(this.name!.hasError('pattern')){
      this.nameErrorMsg.set('Name doesnot contains Numbers');
    } else {
      this.nameErrorMsg.set('');
    }

    if (this.password!.hasError('required')) {
      this.passErrorMsg.set('You must enter password');
    }else if(this.password!.hasError('minlength')){
      this.passErrorMsg.set('Minimun length Should be 8');
    }
    else {
      this.passErrorMsg.set('');
    }

    if (this.type!.hasError('required')) {
      this.typeErrorMsg.set('You must enter type');
    }else {
      this.typeErrorMsg.set('');
    }

     
    if (this.confpassword!.hasError('required')) {
      this.confpasswordErrorMsg.set('You must enter confirm Password');
    }
    else if(this.formData.errors?.['mismatch']){
      this.flagConfirm=true;
      this.confpasswordErrorMsg.set('Password must be match');
    }else{
      this.confpasswordErrorMsg.set('')
    }



  }
  dialogref:any
  readonly dialog = inject(MatDialog);
  openDialog(titl:string,sms:string): void {
    this.dialogref=this.dialog.open(DialogComponent, {
      width: '250px',
      data:{title:titl,msg:sms}
    });
  }

  getOldData:any[]=[]

  onUpdateClick(){
    if(this.formData.valid){

      this.getOldData=this.localstore.getLocalData()

      this.getOldData.forEach((e:any,index:number) => {
        if(e.name==this.formData.value.name){
          this.getOldData[index]=this.formData.value
          localStorage.setItem('login', JSON.stringify(this.getOldData[index]))
        }
      });

      localStorage.setItem('token',JSON.stringify(this.getOldData))

      this.formData.reset();
      this.openDialog('Data Updated',' You Successfully Updated Data');
      // localStorage.setItem('adminFlag','true')
      localStorage.setItem('admin_customerData',JSON.stringify([]))

      setTimeout(() => {
        this.dialogref.close()
        window.location.reload()
    }, 1000);
    this.route.navigate(['main/dashboard/table'])
    }else{
      this.updateErrorMessage();
 
    }
  }
}
