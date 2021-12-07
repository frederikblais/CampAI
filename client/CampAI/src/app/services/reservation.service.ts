import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private http: HttpClient
  ) { }
  
  getAllReservations() {
    return this.http.get(`${environment.serverUrl}/reservation`);
  }

  reserve(name:string, peopleCount: number, lot: number, 
    dateIn: Date, dateOut: Date) {
      return this.http.post(`${environment.serverUrl}/reservation`, {
        name,
        peopleCount,
        lot,
        dateIn,
        dateOut
      });
  }
}
