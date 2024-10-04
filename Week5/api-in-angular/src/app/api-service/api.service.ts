import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  setData(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`,{name:'abc',age:'15'});
  }
}
