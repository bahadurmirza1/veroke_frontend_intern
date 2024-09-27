import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private data:any[]=[{name:'Saad bhai The Great',age:'26'},{name:'bahadur',age:'24'}]

  private datacontent=new BehaviorSubject<any[]>(this.data);

  data$: Observable<any[]> = this.datacontent.asObservable();

  sendData(d: any) {
    this.data.push(d);
    this.datacontent.next(this.data);
  }

  constructor() { }

}
