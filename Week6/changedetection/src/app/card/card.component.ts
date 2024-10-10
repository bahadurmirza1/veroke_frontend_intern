import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CardDataService } from '../card-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  // @Input()
  //   title:string='';
  // @Input()
  //   desc:string='';
  cardData:any;

  constructor( private cdref : ChangeDetectorRef,private dataservice:CardDataService ){
  }
  
  // abc(){
  //   console.log('executed')
  //   return 'bahadur'
  // }
 

  ngOnInit(){
    this.dataservice.data$.subscribe(data => {
      this.cardData = data;

      // setTimeout(() => {
      //   this.cdref.detectChanges();
      // }, 3000);
      
    });
    // this.cardData=this.dataservice.getData();
    
  }

}
