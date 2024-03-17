import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + "/auth"

  constructor(private http: HttpClient) { 
    console.log('apiUrl: ', this.apiUrl);
  }

  login(credential: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"/login", credential);
  }
}
