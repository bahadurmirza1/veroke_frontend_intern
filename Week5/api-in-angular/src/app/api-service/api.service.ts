import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  

  getEmpData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/empData`);
  }

  getStdData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stdData`);
  }

  setData(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`,{name:'abc',age:'15'});
  }
}
