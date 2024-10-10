import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

    this.apiService.getData().subscribe(
      response => {
        this.data = response;
        console.log(this.data)
        setTimeout(() => {
          this.cdref.detectChanges()
        }, 3000);
        
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
    
}



}
