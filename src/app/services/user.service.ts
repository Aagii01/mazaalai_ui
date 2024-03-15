import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' // This makes the service application-wide available
})
export class UserService {
  // Change the apiUrl to a relative path that matches your proxy configuration
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { 
    console.log('apiUrl: ', this.apiUrl);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
