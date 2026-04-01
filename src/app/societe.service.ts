import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocieteService {
  private baseUrl = 'http://localhost:3000/societes';

  constructor(private http: HttpClient) {}

  getSocietes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
