import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {

  private data:any[]=[
    {
      title:'Laptop',
      desc:'This is the Description of Laptop'
    },
    {
      title:'Mobile',
      desc:'This is the Description of Mobile'
    },
    {
      title:'Bag',
      desc:'This is the Description of Bag'
    },
    {
      title:'Mouse',
      desc:'This is the Description of Mouse'
    },
    {
      title:'Keyboard',
      desc:'This is the Description of Keyboard'
    },
    {
      title:'Printer',
      desc:'This is the Description of Printer'
    }
  ]

  private datacontent=new BehaviorSubject<any[]>(this.data);

  data$: Observable<any[]> = this.datacontent.asObservable();

  // sendData(d: any) {
  //   this.data.push(d);
  //   this.datacontent.next(this.data);
  // }
  constructor() { }

  // getData(){
  //   return [
  //     {
  //       title:'Laptops',
  //       desc:'This is the Description of Laptop'
  //     },
  //     {
  //       title:'Mobile',
  //       desc:'This is the Description of Mobile'
  //     },
  //     {
  //       title:'Bag',
  //       desc:'This is the Description of Bag'
  //     },
  //     {
  //       title:'Mouse',
  //       desc:'This is the Description of Mouse'
  //     },
  //     {
  //       title:'Keyboard',
  //       desc:'This is the Description of Keyboard'
  //     },
  //     {
  //       title:'Printer',
  //       desc:'This is the Description of Printer'
  //     }
  //   ]
  // }
}
