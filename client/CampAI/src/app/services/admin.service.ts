import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  isUserAdministrator(password: string | null) {
    if(password === environment.adminPassword) return true;
    return false;
  }
}