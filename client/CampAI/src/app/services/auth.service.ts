import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(username:string, password:string) {
    return this.http.post(`${environment.serverUrl}/users/login`, {
      username,
      password,
    });
  }

  signup(username:string, password:string) {
    return this.http.post(`${environment.serverUrl}/users`, {
      username,
      password,
    });
  }
}
