import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  allRecords:any;

  

  getData(): Observable<any> {
    this.allRecords=this.http.get<any>(`${this.apiUrl}/users`);
    return this.allRecords;
  }

  setData(obj:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`,obj);
  }
  updateData(obj:any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/posts/1`,obj);
  }
}
