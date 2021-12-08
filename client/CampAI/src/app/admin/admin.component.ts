import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  reservationArray: any[] = [];

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    console.log(this.adminService.getAllReservations())
  }
}
