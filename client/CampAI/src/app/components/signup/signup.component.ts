import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  errorMessage: string = ''

  isUsernameValid: boolean = false
  isPasswordValid: boolean = false
  isRePasswordValid: boolean = false
  isDOBValid: boolean = false
  isTOSValid: boolean = false

  DOB: Date = new Date
  TOS: boolean = false
  submitted: boolean = false

  onSubmitUrl:string = '/';


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

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
    this.isRePasswordValid = true
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

    if(this.password != this.rePassword || this.rePassword === '') { // Password must match
      this.errors.push('Password must match')
      this.isRePasswordValid = false
    }

  }

  validateDOB() { // DOB must be > 18 y/o
    this.isDOBValid = true
    var today: Date = new Date()
    var bd: Date = new Date(this.DOB.toString())
    var age: number = today.getFullYear() - bd.getFullYear()
    var month: number = today.getMonth() - bd.getMonth()

    if(!Date.parse(this.DOB.toString())){
      this.errors.push('You must enter a valide date.')
      this.isDOBValid = false
    }

    if (month < 0 || (month === 0 && today.getDate() < bd.getDate())) {
      age--;
    }

    if(age < 18 ) {
      this.errors.push('You must be 18 years old to access this site.')
      this.isDOBValid = false
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

  signInUser() {  // After register, login user
    if (this.isUsernameValid && this.isPasswordValid && this.isDOBValid && this.isTOSValid) {
      this.authService.signup(this.username, this.password).subscribe(
        (response: any) => {
          this.router.navigate(['/'])
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

    // Validate fields
    this.validateUsername()
    this.validatePassword()
    this.validateDOB()
    this.validateTOS()
    this.signInUser()
  }
}
