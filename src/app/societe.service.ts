import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { Observable, timeout, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocieteService {
  // private baseUrl = 'http://localhost:3000/societes';
private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  // getSocietes(): Observable<any[]> {
  //   return this.http.get<any[]>(this.baseUrl);
  // }

  getSocietes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/societes`).pipe(
      timeout(30000),
      catchError(err => {
        console.error('getSocietes timeout/error:', err);
        return of([]);
      })
    );
  }
}
