import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api='http://127.0.0.1:5000'
  constructor(private http:HttpClient) {

   }

   getStdData():Observable<any>{
    return this.http.get(`${this.api}/stdData`)
   }
}
