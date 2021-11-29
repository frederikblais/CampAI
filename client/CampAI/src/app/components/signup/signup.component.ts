import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errors: string[] = []
  username: string = ''
  password: string = ''
  rePassword: string = ''
  isUsernameValid: boolean = false
  isPasswordValid: boolean = false
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

  validatePassword() {
    this.isPasswordValid = true
    const containsLetters = /[a-zA-Z]/g
    const containsNumbers = /\d/g
    const containsSymbols = /[|\\/~^:,;?!&%$@*+]/

    if (this.password.length < 6) { // Password must be >= 6 char
      this.errors.push('Password must be at least 6 characters.')
      this.isPasswordValid = false
    }

    if (!containsLetters.test(this.password)) { // Password must contains letters
      this.errors.push('Password must contain a letter.')
      this.isPasswordValid = false
    }

    if (!containsNumbers.test(this.password)) { // Password must contain a number 
      this.errors.push('Password must contain a number.')
      this.isPasswordValid = false
    }

    if (!containsSymbols.test(this.password)) { // Password must contain a symbol 
      this.errors.push('Password must contain a symbol.')
      this.isPasswordValid = false
    }
    // if(this.password != rePassword) { // Password must match
    
    // }

  }

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
