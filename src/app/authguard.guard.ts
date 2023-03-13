import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private authservice: AuthserviceService, private router: Router) {


  }
  canActivate(route: ActivatedRouteSnapshot,) {

    if (this.authservice.IsLoggedIn()) {

      if (route.data['role'] == this.authservice.getId()) {
        return true
      }
      this.router.navigate(['login']);
      return false
    }

    alert("You have not logged In")

    this.router.navigate(['login']);

    return false;

  }

}
