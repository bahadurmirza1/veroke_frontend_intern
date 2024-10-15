import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api='http://192.168.1.43:3000/api/users'
  constructor(private http:HttpClient) {

   }

   getAllData():Observable<any>{
    return this.http.get(this.api)
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
