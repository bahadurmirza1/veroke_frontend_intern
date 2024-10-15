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
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';

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
    const confirmPassword = form.get('confirmPassword')?.value;
    return password == confirmPassword ? null : { 'mismatch': true };
  }

  constructor(private fb : FormBuilder,private route:Router,private apiservice:ApiService,private routeActive: ActivatedRoute){
    this.routeActive.params.subscribe(params => {
      this.id = params['id'];
      this.type = params['type'];
    });

    this.formData=this.fb.group(
      {
        name:['',[Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
        email:['',[Validators.required,Validators.email]],
        phone:['',[Validators.required,Validators.pattern('^[0-9]+$')]],
        role:['',[Validators.required]],
        password:['',this.type=='add'?[Validators.required,Validators.minLength(8)]:[]],
        confirmPassword:['',this.type=='add'?[Validators.required,Validators.minLength(8)]:[]],
      },{ validators: this.type=='add'?this.passwordMatchValidator:null}
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
  merge(this.confirmPassword!.statusChanges, this.confirmPassword!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  merge(this.role!.statusChanges, this.role!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  id:any;
  type='add';
  ngOnInit(){



    



    if (this.type=='view' || this.type=='edit'){

      this.apiservice.getDataByID(this.id).subscribe(
        response => {
          this.formData.patchValue(response);
        },
        error => {
          console.error('Error fetching data', error);
          alert("Error")
        }
      );
    }
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
  get role() {
    return this.formData.get('role');
  }
  get confirmPassword() {
    return this.formData.get('confirmPassword');
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

    if (this.role!.hasError('required')) {
      this.typeErrorMsg.set('You must enter type');
    }else {
      this.typeErrorMsg.set('');
    }

     
    if (this.confirmPassword!.hasError('required')) {
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
  // openDialog(titl:string,sms:string): void {
  //   this.dialogref=this.dialog.open(DialogComponent, {
  //     width: '250px',
  //     data:{title:titl,msg:sms}
  //   });
  // }

  getOldData:any[]=[]

  onUpdateClick(){
    debugger
    if(this.formData.valid){
      
      if(this.type=='add'){
      this.apiservice.setData(this.formData.value).subscribe(
        response => {
          console.log(response);
          this.route.navigate([''])
        },
        error => {
          console.error('Error fetching data', error);
          alert("Error")
        }
      );
    }else if(this.type=='edit'){
      this.apiservice.updateDataByID(this.id,this.formData.value).subscribe(
        response => {
          console.log(response);
          this.type='add'
          this.route.navigate([''])
        },
        error => {
          console.error('Error fetching data', error);
          alert("Error")
        }
      );
    }else if(this.type=='view'){
      this.route.navigate([''])
    }
      
    }else{
        this.updateErrorMessage();

    }
  }
}
