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

   searchStdData(name:string):Observable<any>{
    return this.http.get(`${this.api}/search?name=${name}`)
   }

   setData(obj:any):Observable<any>{
    return this.http.post(`${this.api}/signup`,obj)
   }

   updateDataByID(id:number,obj:any):Observable<any>{
    return this.http.put(`${this.api}/${id}`,obj)
   }

   DeleteDataByID(id:number):Observable<any>{
    return this.http.delete(`${this.api}/${id}`)
   }

   getDataByID(id:number):Observable<any>{
    return this.http.get(`${this.api}/${id}`)
   }

}
