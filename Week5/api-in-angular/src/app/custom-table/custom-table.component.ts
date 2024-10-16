import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { ApiService } from '../api-service/api.service';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustomTableComponent {
  
  Records:any[]=[];

  cols:any[]=[
    {key:'id',label:'ID'},
    {key:'name',label:'Name'},
    {key:'email',label:'Email'},
    {key:'street',label:'Street'},
    {key:'city',label:'City'},
  ]
  actions:any[]=[
    {key:'view',label:'View'},
    {key:'edit',label:'Edit'},
    {key:'delete',label:'Delete'}
  ]

  constructor(private apiService: ApiService,private cdref:ChangeDetectorRef,private ngZone : NgZone) { }
  nam='bahadur'

  
  ngOnInit(): void {
    

  //   this.ngZone.run(() => {
      
  //   this.apiService.getData().subscribe(
  //     response => {
  //       this.nam='mirza'
  //       this.Records = response;
  //       console.log('REc',this.Records)
  //       setTimeout(() => {
  //         this.cdref.detectChanges()
  //       }, 3000);
       
        
  //     },
  //     error => {
  //       console.error('Error fetching data', error);
  //     }
  //   );
  // });
}

onSet(){
  this.apiService.setData().subscribe(
    response => {
      this.Records = response;
      console.log('--',this.Records)
    },
    error => {
      console.error('Error fetching data', error);
    }
  );
}
}
