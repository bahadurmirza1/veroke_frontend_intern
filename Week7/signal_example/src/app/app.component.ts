import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class AppComponent {
  title = 'signal_example';
  empName='Ghalid'
  apiData=signal<any[]>([]);
  // apiData:any
  stdName=signal<string>('Ali')
  teacherName=signal<string>('Fahad')

  stdTeacher=computed(()=>this.stdName()+' '+this.teacherName())

  constructor(private apiservice:ApiService){

   
    setTimeout(() => {
      
      this.stdName.set('Usama')
      this.teacherName.set('Saad')
      apiservice.getStdData().subscribe(
        {
          next:(data)=>{this.apiData.set(data)},
          error:(error)=>{console.error('Error',error);}
          
        }
      )
;
    }, 2000);

    

  }

  ngOnInit(){
    
  }

  // changeName(){
  //   this.stdName.set('Usama')
  // }
  // changeEmp(){
  //   this.empName="Yasir"
  // }
}
