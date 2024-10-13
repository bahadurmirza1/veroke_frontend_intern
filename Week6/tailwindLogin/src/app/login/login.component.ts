import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { LocalstoreService } from '../localstore.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,ReactiveFormsModule,MatIconModule,MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {


  protected readonly value = signal('');
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  formData:FormGroup;

  constructor(private fb:FormBuilder,private cdref:ChangeDetectorRef,private route:Router,private localstore:LocalstoreService){

    this.formData=this.fb.group(
      {
        email:['',Validators.required],
        password:['',Validators.required]
      }
    )

  }
  dialogref:any
  readonly dialog = inject(MatDialog);
  openDialog(msg:any): void {
    this.dialogref=this.dialog.open(DialogComponent, {
      width: '250px',
      data:msg
    });
  }

  private _snackBar = inject(MatSnackBar);



  datatostore:any;
  fetchfromStorage:any[]=[]
  ngOnInit(){

  }
  gotoSignup(){
    localStorage.setItem('type','add')

    this.route.navigate(['auth/signup'])
  }
  inValid_email_pass=true
  inValid_email=true
  inValid_pass=true
  flagCheck=true
  onLoginClick(){

    if(this.formData.valid){

    //this.fetchfromStorage=localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')!):[];
    this.fetchfromStorage=this.localstore.getLocalData()
    this.fetchfromStorage.forEach((e:any,index:number) => {
      if(e.email==this.formData.value.email && this.flagCheck){
         
        this.flagCheck=false
        if(e.password==this.formData.value.password){
          this.inValid_email_pass=false
          this.inValid_email=false
          this.inValid_pass=false
          localStorage.setItem('login', JSON.stringify(this.fetchfromStorage[index]))
          this.route.navigate(['main/dashboard']);
          return
        }else{
          // wrong password
          this.inValid_email_pass=false
          this.inValid_email=false
          return
        }
      }else if(e.password==this.formData.value.password && this.flagCheck){
        this.flagCheck=false
        if(e.email==this.formData.value.email){
          this.inValid_email_pass=false
          this.inValid_email=false
          this.inValid_pass=false
          localStorage.setItem('login', JSON.stringify(this.fetchfromStorage[index]))
          this.route.navigate(['dashboard']);
          return
        }else{
          // wrong email
          this.inValid_email_pass=false
          this.inValid_pass=false
          return
        }
      }
    });

    if(this.inValid_email_pass){ 
      this.flagCheck=true
      this.inValid_email_pass=true
      this.inValid_email=true
      this.inValid_pass=true
      this.openDialog({title:'Both Email,Password are Wrong ',msg:'Please Enter Correct Email and Password'});

      setTimeout(() => {
        this.dialogref.close()
    }, 2000);

    }
    else if(this.inValid_email){
      this.flagCheck=true
      this.inValid_email_pass=true
      this.inValid_email=true
      this.inValid_pass=true
      this.openDialog({title:'Wrong Email',msg:'Please Enter Correct Email'});
      setTimeout(() => {
        this.dialogref.close()
      }, 2000);
    }
    else if(this.inValid_pass){
      this.flagCheck=true
      this.inValid_email_pass=true
      this.inValid_email=true
      this.inValid_pass=true
      this.openDialog({title:'Wrong Password',msg:'Please Enter Correct Password'});
      setTimeout(() => {
        this.dialogref.close()
      }, 2000);
    }
    

  }

  }
 


}
