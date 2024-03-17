import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
  
    return true;
  }
}


const isAuthenticated = () => {
  if(localStorage.getItem("token")){
    return true;
  }
  return false; 
};
