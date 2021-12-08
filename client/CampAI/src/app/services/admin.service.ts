import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface iReservations {
  name: string;
  peopleCount: number;
  lot: number;
  DOA:Date;
  DOD: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  reservations: BehaviorSubject<iReservations[]> = new BehaviorSubject(
    [] as iReservations[]
  );

  constructor(
    private http: HttpClient
  ) { }

  isUserAdministrator(password: string | null) {
    if(password === environment.adminPassword) return true;
    return false;
  }

  getAllReservations() {
    
    const response:any = this.http.get(`${environment.serverUrl}/reservation`);

    return console.log('res: ',response)
  }
}