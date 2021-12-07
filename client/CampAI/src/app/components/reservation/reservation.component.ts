import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  errors: string[] = []
  errorMessage: string = ''
  submitted: boolean = false

  reservationName: string = ''
  peopleCount: number = 0
  lot: number = 0
  arrival: Date = new Date
  departure: Date = new Date

  isReservationNameValid: boolean = false
  isPeopleCountValid: boolean = false
  isLotValid: boolean = false
  isArrivalValid: boolean = false
  isDepartureValid: boolean = false
  isTOSValid: boolean = false
  isCancelValid:boolean = false

  constructor(
    private reservationService: ReservationService
  ) { }

  ngOnInit(): void {}

  validateReservationName() {
    this.isReservationNameValid = true;

    if (this.reservationName.length < 3) { // Reservation must be >= 3 char
      this.errors.push('Reservation name must be at least 3 characters.')
      this.isReservationNameValid = false
    }

    const alfaNumericRegex = /^[a-z0-9]+$/i
    if (!alfaNumericRegex.test(this.reservationName)) { // Reservation must meet the regex requirements
      this.errors.push('Reservation name must be alfa numeric.')
      this.isReservationNameValid = false
    }
  }

  validatePeopleCount() {
    this.isPeopleCountValid = true;

    if (this.peopleCount < 1) { // People count must be more than 0
      this.errors.push('You must have 1 person for a reservation.')
      this.isPeopleCountValid = false
    }

    if (this.peopleCount > 10) {  // People count cannot be greater than 100
      this.errors.push('You cannot have more than 10 people for a single reservation.')
      this.isPeopleCountValid = false
    }
  }

  validateLot() { // Lot must be in range
    this.isLotValid = true;

    if(this.lot > 100 || this.lot < 1) {
      this.errors.push('You must choose a valid lot, see link for availabilities.')
      this.isLotValid = false
    }
  }

  validateDOA() {
    this.isArrivalValid = true;

    const today = new Date();
    var timestamp: Date = new Date(this.arrival.toString())
    if(today > timestamp) {
      this.errors.push('The minimum booking needs to be 48 hours ahead.')
      this.isArrivalValid = false
    }
  }

  validateDOD() {
    this.isDepartureValid = true;

    var end: Date = new Date(this.departure.toString())
    var start: Date = new Date(this.arrival.toString())
    if(start > end || end === start) {
      this.errors.push('You cannot depart before the arrival.')
      this.isDepartureValid = false
    }
  }

  validateTOS() { // Validate term of services
    this.isTOSValid = true

    var element: HTMLInputElement = <HTMLInputElement> document.getElementById("TOS");
    if (!element.checked) {
      this.errors.push("You must accept the Terms and Conditions")
      this.isTOSValid = false
    }
  }

  validateCancel() { // Validate Cancel agreement
    this.isCancelValid = true

    var element: HTMLInputElement = <HTMLInputElement> document.getElementById("CS");
    if (!element.checked) {
      this.errors.push("Please confirm the cancelation terms")
      this.isCancelValid = false
    }

  }

  createReservation() {
    if (this.isReservationNameValid && this.isPeopleCountValid && this.isLotValid && this.isArrivalValid
      && this.isDepartureValid && this.isTOSValid && this.isCancelValid) {
      this.reservationService.reserve(this.reservationName, this.peopleCount, this.lot, this.arrival, this.departure)
        .subscribe(
        (response: any) => {
          console.log('success')
        },
        (error: any) => {
          console.log(error);
          this.errorMessage = error.statusText
        }
      );
    }
  }

  onSubmitClick() {

    // Reset
    this.submitted = true
    this.errors = []

    this.validateReservationName()
    this.validatePeopleCount()
    this.validateLot()
    this.validateDOA()
    this.validateDOD()
    this.validateTOS()
    this.validateCancel()
    this.createReservation()
  }

}
