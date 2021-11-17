import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private router: Router
    ) {}

    canActivate(): boolean {
      
        if(localStorage.getItem('token')){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }

    }
}