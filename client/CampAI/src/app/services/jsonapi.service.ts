import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonapiService {

  constructor(
    private http: HttpClient
  ) {}

  getTodo() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}