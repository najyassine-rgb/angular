import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { login: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  logout() {
    localStorage.removeItem('token');
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
}
