import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Route, Router, RouterState, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuardService implements CanActivate {

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
    if(window.sessionStorage.getItem("token")) {
      return true
    } else {
      this.router.navigate(["/login"])
    }
  }

  constructor(private router : Router) { }
}
