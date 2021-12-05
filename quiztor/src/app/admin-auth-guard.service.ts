import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
    if(window.sessionStorage.getItem("admin") == "true") {
      return true
    } else {
      this.router.navigate(["/login"])
    }
  }

  constructor(private router : Router) { }
}
