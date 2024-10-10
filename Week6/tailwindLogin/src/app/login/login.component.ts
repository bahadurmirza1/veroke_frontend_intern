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

  constructor(private fb:FormBuilder,private cdref:ChangeDetectorRef,private route:Router){

    this.formData=this.fb.group(
      {
        email:['',Validators.required],
        password:['',Validators.required]
      }
    )

  }
  dialogref:any
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    this.dialogref=this.dialog.open(DialogComponent, {
      width: '250px',
    });
  }

  private _snackBar = inject(MatSnackBar);



  datatostore:any;
  fetchfromStorage:any[]=[]
  ngOnInit(){

  }
  gotoSignup(){
    this.route.navigate(['signup'])
  }
  flagValid=false
  
  onLoginClick(){

    if(this.formData.valid){

    this.fetchfromStorage=localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')!):[];
    this.fetchfromStorage.forEach((e:any,index:number) => {
      if(e.email==this.formData.value.email && e.password==this.formData.value.password){
        this.flagValid=true
        localStorage.setItem('login', JSON.stringify(this.fetchfromStorage[index]))
        this.route.navigate(['dashboard']);
      }
    });

    if(!this.flagValid){

      this.openDialog();

      setTimeout(() => {
        this.dialogref.close()
    }, 2000);

    }
    

  }

  }
 


}
