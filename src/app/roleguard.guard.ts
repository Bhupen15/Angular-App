import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleguardGuard implements CanActivate {
  canActivate() {
    let Role = localStorage.getItem("userTYpe");
    if (Role == "admin") {

      return true;
    }

    alert("You don't have admin rights");
    return false;
  }

}
