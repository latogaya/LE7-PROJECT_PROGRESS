import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private partsUrl: string = "https://localhost:7054/api/Parts/";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    rejectUnauthorized: false
  };

  constructor(private http: HttpClient) { }

  getPartsList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.partsUrl}ReadData`);
  }

  addParts(part: any): Observable<any> {
    return this.http.post<any>(`${this.partsUrl}CreateData`, part, this.httpOptions);
  }

  updateParts(part: any): Observable<any> {
    return this.http.put<any>(`${this.partsUrl}UpdateData`, part, this.httpOptions);
  }
  
  deleteParts(part: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(part)
    };
    return this.http.delete<any>(`${this.partsUrl}DeleteData`, httpOptions);
  }

  //newly added code
  buildParts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.partsUrl}BuildPrice`);
  }//
}