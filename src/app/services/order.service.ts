import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl + "/order"
  constructor(private http: HttpClient) { 
    console.log('apiUrl: ', this.apiUrl);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
  
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteSelectedOrders(ids : any): Observable<any> {
    return this.http.delete<any[]>(this.apiUrl, {body:ids});
  }

}
