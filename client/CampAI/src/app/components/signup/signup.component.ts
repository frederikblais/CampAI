import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errors: string[] = []
  username: string = ''
  isUsernameValid: boolean = false
  submitted: boolean = false

  constructor() { }

  ngOnInit(): void {}

  validateUsername() {
    this.isUsernameValid = true
    if (this.username.length < 3) { // UPN must be >= 3 char
      this.errors.push('Username must be at least 3 characters.')
      this.isUsernameValid = false
    }

    const alfaNumericRegex = /^[a-z0-9]+$/i
    if (!alfaNumericRegex.test(this.username)) { // UPN must meet the regex requirements
      this.errors.push('Username must be alfa numeric.')
      this.isUsernameValid = false
    }
  }

  validatePassword() {}

  validateDOB() {}

  validateTOS() {}

  onSubmitClick() {
    this.submitted = true
    this.errors = [] // Reset
    this.validateUsername()
    this.validatePassword()
    this.validateDOB()
    this.validateTOS()
  }

}
