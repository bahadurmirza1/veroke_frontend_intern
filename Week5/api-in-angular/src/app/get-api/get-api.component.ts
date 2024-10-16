import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-get-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-api.component.html',
  styleUrl: './get-api.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class GetApiComponent {
  data:any;
  constructor(private apiService: ApiService,private cdref:ChangeDetectorRef) { }
  // constructor(private http:HttpClient){}
  ngOnInit(): void {    
}

callApi(){
 
  this.apiService.getEmpData().pipe(
    concatMap((empData)=>{
      console.log(empData)
      return this.apiService.getStdData();
    })
  ).subscribe({
    next:(stdData)=>{
      console.log(stdData)
    },
    error:(error)=>{
      console.error('Error',error)
    }
  })
}



}
