import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // api: string = 'http://api-weather/api/';
  api: string = 'https://api.skochko.net/api/';

  constructor(private http: HttpClient) { }

  loginUser(user) {
    return this.http.post(this.api + 'login-user', user);
  }

  checkUser() {
    return this.http.get(`${this.api}check-user?token=${this.getToken()}`);
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
